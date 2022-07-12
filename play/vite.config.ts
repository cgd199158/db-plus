import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { projectRoot } from '../build/utils/paths';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^db-plus(\/(es|lib))?$/,
        replacement: resolve(projectRoot, 'packages/components/index.ts'),
      },
      {
        find: /^db-plus\/(es|lib)\/(.*)$/,
        replacement: `${resolve(projectRoot, 'packages')}/$2`,
      },
    ],
  },
  plugins: [vue()],
});
