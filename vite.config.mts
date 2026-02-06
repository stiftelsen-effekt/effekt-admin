import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "typescript-fsa": path.resolve(__dirname, "src/lib/typescript-fsa.ts"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
  },
});
