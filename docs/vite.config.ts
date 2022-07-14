import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { resolve } from 'path';
import { projectRoot } from '../build/utils/paths';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@components\/(.+)/,
        replacement: resolve(projectRoot, '/packages/components/$1'),
      },
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
