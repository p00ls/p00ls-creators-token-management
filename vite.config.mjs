import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineConfig({
  root: __dirname,
  plugins: [react(), nodePolyfills({
    globals: {
      Buffer: true, // Polyfill Buffer
    },
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4200,
    host: '0.0.0.0',
    allowedHosts: ['.ngrok.io'],
  },
  preview: {
    port: 4300,
    host: '0.0.0.0',
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
  },
});
