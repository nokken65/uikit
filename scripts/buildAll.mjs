import { resolve } from 'node:path';
import { build } from 'vite';
import dts from 'vite-plugin-dts';

import { __dirname, rootPath, srcPath } from './constants.mjs';

const buildAll = async () => {
  await build({
    configFile: resolve(__dirname, 'vite-build.config.ts'),

    build: {
      lib: {
        entry: resolve(srcPath, 'components', 'index.ts'),
        name: 'uikit',
        formats: ['cjs', 'es'],
        fileName: (format) => `uikit.${format}.js`,
      },
      outDir: resolve(rootPath, 'dist'),
    },

    plugins: [
      dts({
        tsConfigFilePath: resolve(rootPath, 'tsconfig.build.json'),
      }),
    ],
  });
};

export { buildAll };
