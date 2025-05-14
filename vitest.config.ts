import { defineConfig, mergeConfig } from 'vitest/config';

import path from 'path';
import { fileURLToPath } from 'url';

import viteConfig from './vite.config';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }),
);
