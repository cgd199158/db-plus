import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: [
      // {
      //   find: /^db-plus(\/(es|lib))?$/,
      //   replacement: resolve(__dirname, '../packages/components/index.ts'),
      // },
      // {
      //   find: /^db-plus\/(es|lib)\/(.*)$/,
      //   replacement: `${resolve(__dirname, '../packages')}/$2`,
      // },
    ],
  },
  plugins: [vue()],
});
