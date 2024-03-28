import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import * as tsconfck from "tsconfck";
import { readFileSync } from "fs";

function matchesAliasPath(path: string, aliases: string[]) {
  // Remove the trailing '*' from the alias for accurate prefix matching.
  aliases = aliases.map((key) => key.replace(/\*$/, ""));

  // Convert each alias pattern into a RegExp
  const regexps = aliases.map((alias) => {
    // Escape special RegExp characters, then replace '*' with '.*' (correctly this time)
    const regexString = alias
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Note: '*' is not included in the characters to escape
      .replace(/\*/g, ".*"); // '*' is now correctly replaced with '.*'
    return new RegExp(`^${regexString}`);
  });

  // Check if the path matches any of the converted RegExp patterns
  return regexps.some((regexp) => regexp.test(path));
}

export async function tsconfigPathsPlugin(): Promise<UserConfig["plugins"]> {
  const resolvePlugin = tsconfigPaths({ root: process.cwd() });

  // The fake importer path is so that tsconfig paths can resolve alias
  // paths in packages from the root of the project instead of the package
  // We need to see if there is any caching mechanism in vite that could
  // play a role in performance here.
  const fakeImporterPath = path.join(process.cwd(), "src/App.tsx");
  let aliases: string[] = []; // initialized lazily after config is resolved to ensure the tsconfig.json is generated

  return [
    resolvePlugin,
    {
      name: "front-commerce-tsconfig-paths",
      async configResolved() {
        const tsconfigFile = JSON.parse(
          tsconfck.toJson(
            readFileSync(path.join(process.cwd(), "tsconfig.json"), "utf-8")
          )
        );

        const paths = tsconfigFile?.compilerOptions.paths ?? {};
        aliases = Object.keys(paths);
      },
      async resolveId(id) {
        if (matchesAliasPath(id, aliases)) {
          // We use `.call` to bind the `this` context to the original
          const resolvedPath = await (resolvePlugin?.resolveId as any)?.call?.(
            this,
            id,
            fakeImporterPath,
            { skipSelf: true }
          );

          if (resolvedPath) {
            return resolvedPath;
          }
        }
      },
    },
  ];
}
