// 串行(series)和并行(parallel)

import { series, parallel } from 'gulp';
import { widthTaskName, run } from './utils';

// gulp 不叫打包 做代码转转化
export default series(
  // 1.清空dist文件
  widthTaskName('clean', async () => {
    run('rm -rf dist');
  }),
  // 打包样式 // 打包工具方法 // 打包所有组件 // 打包每个组件(并行)
  widthTaskName('buildPackages', () => run('pnpm run --filter ./packages --parallel build')),
  // 生成一个组件库
  // 发布组件
);
