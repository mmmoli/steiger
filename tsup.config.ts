import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bin.ts", "src/plopfile.js"],
  clean: true,
  publicDir: true,
  treeshake: "smallest",
  external: ["@parcel/watcher"],
  format: ["esm"],
});
