import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tsconfigPathsPlugin } from "./tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    force: true,
    // include: ["@test-pkg/hello-world > object-path"], // uncomment to fix
  },
  plugins: [react(), tsconfigPathsPlugin()],
});
