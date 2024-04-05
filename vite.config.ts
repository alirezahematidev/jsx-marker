import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { minify } from "rollup-plugin-esbuild";
import fs from "node:fs";
import path from "node:path";

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8"));

export default defineConfig({
  plugins: [react({ exclude: /node_modules/ }), dts({ tsconfigPath: path.resolve(__dirname, "tsconfig.json") })],
  mode: "production",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      formats: ["cjs", "es"],
      name: "jsxMarker",
      fileName: "jsx-marker",
    },
    rollupOptions: {
      plugins: [minify({ minify: false, minifyWhitespace: true, minifySyntax: true })],
      external: [...Object.keys(pkg.dependencies)],
      treeshake: "recommended",
    },
  },
});
