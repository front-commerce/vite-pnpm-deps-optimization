import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const includePathEsbuildPlugin = (filter) => {
  return {
    name: "include-path:esbuild",
    setup(build) {
      // always occur BEFORE Vite's own resolver. See https://github.com/vitejs/vite/blob/72cd3e367f8a0bbde9232ac264cfb4c2b07d9ad5/packages/vite/src/node/optimizer/scan.ts#L246
      build.onResolve({ filter }, (args) => {
        console.log("Resolving:", args.path);
        return {
          external: false,
        };
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      plugins: [includePathEsbuildPlugin(/^@test-pkg.*/)],
    },
  },
});
