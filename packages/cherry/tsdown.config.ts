import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  target: "es2022",
  platform: "neutral",
  external: ["valibot", "neverthrow"],
  exports: {
    // links my source files in the main package.json while developing, only links dist when building prod
    devExports: true,
  }
});
