import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import glob from 'fast-glob';
import dts from 'vite-plugin-dts';
import type { LogLevel, Plugin, LibraryFormats } from 'vite';

interface Manifest {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  version?: string;
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest;
const componentsDir = resolve(__dirname, 'packages/components');

const outDir = process.env.OUT_DIR || 'dist';
const format = (process.env.FORMAT || 'es') as LibraryFormats;
const logLevel = process.env.LOG_LEVEL;
const sourceMap = process.env.SOURCE_MAP === 'true';

const prePlugins = (plugins: Plugin[]): Plugin[] => {
  return plugins.map((plugin) => ({ ...plugin, enforce: 'pre', apply: 'build' }));
};

const externalPkgs = ['vue', '@vicons'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
);

const external = (id: string) => externalPkgs.some((p) => p === id || id.startsWith(`${p}/`));

export default defineConfig(async () => {
  const input = await glob(resolve(__dirname, 'packages/components/**/*.{ts,vue}'), {
    cwd: componentsDir,
    absolute: true,
    onlyFiles: true,
    ignore: ['vite.config.ts', 'node_modules/**', '**/__serve__/**'],
  });
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
    resolve: {
      alias: [
        { find: /^@db-plus\/config(.+)/, replacement: resolve(__dirname, `packages/config$1`) },
        { find: /^@db-plus\/hooks(.+)/, replacement: resolve(__dirname, `packages/hooks$1`) },
        { find: /^@db-plus\/utils(.+)/, replacement: resolve(__dirname, `packages/utils$1`) },
        // { find: '@db-plus/config', replacement: resolve(__dirname, 'packages/config') },
        // { find: '@db-plus/utils', replacement: resolve(__dirname, 'packages/utils') },
      ],
    },
    build: {
      outDir,
      sourcemap: sourceMap,
      lib: {
        entry: resolve(componentsDir, 'index.ts'),
        formats: [format],
      },
      rollupOptions: {
        input,
        external,
        output: {
          preserveModules: true,
          preserveModulesRoot: componentsDir,
          entryFileNames: `[name].${format === 'es' ? 'mjs' : 'js'}`,
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
            if (id.startsWith('@/style')) {
              return {
                id: id.replace(/@\/style\/(.+).scss$/, 'db-plus/css/$1.css'),
                external: 'absolute',
              };
            }
          },
        },
      ]),
      vue(),
      vueJsx(),
      // dts({
      //   exclude: [
      //     'node_modules',
      //     'packages/config',
      //     'packages/hooks',
      //     'package/utile',
      //     'package/components/*/__serve__',
      //   ],
      //   compilerOptions: { sourceMap: sourceMap },
      //   copyDtsFiles: false,
      // }),
    ],
  };
});
