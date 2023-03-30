import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    month: "src/month/index.ts",
  },
});
