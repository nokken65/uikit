import { resolve } from 'node:path';
import { build } from 'vite';

import { __dirname, rootPath, srcPath } from './constants.mjs';
import { resolveNames } from './utils.mjs';

const buildComponents = async () => {
  const names = await resolveNames();

  names.forEach(async (name) => {
    await build({
      configFile: resolve(__dirname, 'vite-build.config.ts'),

      build: {
        lib: {
          entry: resolve(srcPath, 'components', name, 'index.ts'),
          name: name,
          formats: ['cjs', 'es'],
          fileName: (format) => `index.${format}.js`,
        },

        outDir: resolve(rootPath, 'dist', name),
      },
    });
  });
};

export { buildComponents };
