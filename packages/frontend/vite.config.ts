/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      '~': `${process.cwd()}/src`,
    },
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  test: {
    css: false,
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/setup.ts',
  },
});
