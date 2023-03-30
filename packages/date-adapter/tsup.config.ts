import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: {
    index: "src/index.ts",
    "dayjs-adapter": "src/dayjs-adapter/index.ts",
  },
  dts: true,
  format: ["cjs", "esm"],
  clean: true,
});
