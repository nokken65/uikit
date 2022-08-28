import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { regexesOfExternalPackages } from './constants.mjs';

export default defineConfig(() => ({
  mode: 'production',
  build: {
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          clsx: 'Clsx',
        },
      },
      external: regexesOfExternalPackages,
    },
  },
  plugins: [
    react({
      include: '**/*.tsx',
      exclude: /\.stories\.(t|j)sx?$/,
      fastRefresh: false,
    }),
  ],
  clearScreen: false,
}));
