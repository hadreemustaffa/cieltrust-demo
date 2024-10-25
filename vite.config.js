import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const __dirname = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  base: '/yourbank/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        careers: resolve(__dirname, 'careers/index.html'),
        security: resolve(__dirname, 'security/index.html'),
        login: resolve(__dirname, 'login/index.html'),
        signup: resolve(__dirname, 'signup/index.html'),
      },
    },
  },
});
