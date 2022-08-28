import { build } from "vite";
import { resolve } from "node:path";
import { rootPath, srcPath, __dirname } from "./constants.mjs";
import { resolveNames } from "./utils.mjs";

const buildComponents = async () => {
  const names = await resolveNames();

  names.forEach(async (name) => {
    await build({
      configFile: resolve(__dirname, "vite-build.config.ts"),

      build: {
        lib: {
          entry: resolve(srcPath, name, "index.ts"),
          name: name,
          formats: ["cjs", "es"],
          fileName: (format) => `index.${format}.js`,
        },

        outDir: resolve(rootPath, "dist", name),
      },
    });
  });
};

export { buildComponents };
