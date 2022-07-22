import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version || ''),
  },
  resolve: {
    alias: [
      {
        find: /^@\/style\/(.+)/,
        replacement: resolve(__dirname, '../packages/theme-chalk/src/$1'),
      },
      {
        find: /^\@db-plus\/components/,
        replacement: resolve(__dirname, '../packages/components/index.ts'),
      },
      {
        find: /^\@db-plus\/config/,
        replacement: resolve(__dirname, '../packages/config/index.ts'),
      },
      // {
      //   find: /db\-plus/,
      //   replacement: resolve(__dirname, '../packages/components/index.ts'),
      // },
      { find: /^@\/(.+)/, replacement: resolve(__dirname, './src/$1') },
    ],
  },
  plugins: [vue(), vueJsx()],
});
