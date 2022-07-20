import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
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
      { find: /^@\/(.+)/, replacement: resolve(__dirname, './src/$1') },
    ],
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: resolve(__dirname, './src/types/vue-components.d.ts'),
    }),
  ],
});
