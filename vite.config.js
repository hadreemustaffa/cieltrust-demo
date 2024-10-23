import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: '/yourbank-main/',
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
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
