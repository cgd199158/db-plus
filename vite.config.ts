import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import glob from 'fast-glob';
import dts from 'vite-plugin-dts';
import { projectRoot } from './build/utils/paths';
import type { Plugin } from 'vite';

const componentsDir = resolve(__dirname, 'packages/components');
const sourceMap = false;
const prePlugins = (plugins: Plugin[]): Plugin[] => {
  return plugins.map((plugin) => ({ ...plugin, enforce: 'pre', apply: 'build' }));
};

export default defineConfig(async () => {
  const input = await glob('**/*.{ts,vue}', {
    cwd: componentsDir,
    absolute: true,
    onlyFiles: true,
    ignore: ['vite.config.ts'],
  });
  return {
    logLevel: 'info',
    publicDir: false,
    resolve: {},
    build: {
      outDir: resolve(projectRoot, 'dist/es'),
      sourcemap: sourceMap,
      lib: {
        entry: resolve(componentsDir, 'index.ts'),
        fileName: 'db-plus',
        formats: ['es'],
      },
      rollupOptions: {
        input,
        external: ['vue'],
        output: {
          preserveModules: true,
          preserveModulesRoot: componentsDir,
          entryFileNames: '[name].js',
        },
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
    plugins: [
      ...prePlugins([
        {
          name: 'db-plus:resolve',
          resolveId(id) {
            if (id.startsWith('@db-plus/theme-chalk')) {
              return {
                id: id.replace(/@db-plus\/theme-chalk\/(.+).scss$/, '../css/$1.css'),
                external: 'absolute',
              };
            }
            // else if (id.startsWith('@/common/icons')) {
            //   return {
            //     id: id.replace(/^@\/common\/icons/, 'vexip-ui/icons'),
            //     external: 'absolute'
            //   }
            // }
          },
        },
      ]),
      vue(),
      vueJsx(),
      dts({
        entryRoot: componentsDir,
        exclude: ['node_modules', 'vite.config.ts'],
        compilerOptions: { sourceMap: sourceMap },
        copyDtsFiles: false,
      }),
    ],
  };
});
