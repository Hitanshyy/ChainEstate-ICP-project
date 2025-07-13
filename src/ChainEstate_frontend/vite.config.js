/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import environment from 'vite-plugin-environment';

// Load .env manually (optional, handled by plugin)
dotenv.config({ path: '../../.env' });

export default defineConfig({
  plugins: [
    react(),
    environment({
      prefix: 'CANISTER_',
    }),
    environment({
      prefix: 'DFX_',
    }),
  ],
  resolve: {
    alias: {
      declarations: fileURLToPath(new URL('../declarations', import.meta.url)),
    },
    dedupe: ['@dfinity/agent'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
});
