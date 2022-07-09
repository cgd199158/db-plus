import path from 'path';
import { outDir } from './paths';

export const buildConfig = {
  esm: {
    module: 'ESNext', // tsconfig输出的结果es6模块
    format: 'esm', // 需要配置的格式化后的模块规范
    ext: 'mjs',
    output: {
      name: 'es', // 打包到dist目录下的那个目录
      path: path.resolve(outDir, 'es'),
    },
    bundle: {
      path: `db-plus/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(outDir, 'lib'),
    },
    bundle: {
      path: `db-plus/lib`,
    },
  },
};
