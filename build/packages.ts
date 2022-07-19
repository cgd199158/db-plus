// 专门打包util,指令,hooks的
import { series, parallel, src, dest } from 'gulp';
import path from 'path';
import { buildConfig } from './utils/config';
import { projectRoot, buildOutput } from './utils/paths';
import ts from 'gulp-typescript';
import { withTaskName } from './utils/index';

export const buildPackages = (dirname: string, name: string) => {
  console.log('dirname', dirname);
  console.log('name', name);
  // 打包的格式需要什么类型的? 模块规范 cjs es规范

  // 可以用rollup , 这个逻辑就是让ts=>js
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name);

    return series(
      withTaskName(`build:${dirname} `, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json'); // ts的配置文件
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules'];
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 需要生成配置文件
              strict: false,
              module: config.module,
            })(),
          )
          .pipe(dest(output));
      }),
      withTaskName(`copy: ${dirname}`, () => {
        // 放到es => utils 和 lib => utils
        return src(`${output}/**`).pipe(dest(path.resolve(buildOutput, config.output.name, name)));
      }),
    );
  });
  return parallel(...tasks);
};
