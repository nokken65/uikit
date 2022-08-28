import dts from "vite-plugin-dts";
import { build } from "vite";
import { resolve } from "node:path";
import { rootPath, srcPath, __dirname } from "./constants.mjs";

const buildAll = async () => {
  await build({
    configFile: resolve(__dirname, "vite-build.config.ts"),

    build: {
      lib: {
        entry: resolve(srcPath, "index.ts"),
        name: "uikit",
        formats: ["cjs", "es"],
        fileName: (format) => `uikit.${format}.js`,
      },
      outDir: resolve(rootPath, "dist"),
    },

    plugins: [
      dts({
        tsConfigFilePath: resolve(rootPath, "tsconfig.build.json"),
      }),
    ],
  });
};

export { buildAll };
