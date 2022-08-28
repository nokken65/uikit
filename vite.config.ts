import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  server: {
    open: false,
    hmr: true,
  },
  root: '.',
  clearScreen: false,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));
