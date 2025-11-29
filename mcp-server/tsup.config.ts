import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  target: "node18",
  outDir: "dist",
  bundle: true, // Bundle the referenced files from ../src/lib
  banner: ({ format }) => {
    if (format === "esm") {
      return {
        js: "#!/usr/bin/env node",
      };
    }
    return {};
  },
});
