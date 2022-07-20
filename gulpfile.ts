// 打包样式
// pnpm install gulp-sass @types/gulp-sass sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css -D -w
// 串行依次打包
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import { existsSync, emptyDir, mkdirSync } from 'fs-extra';
import cleanCss from 'gulp-clean-css';

import { series, src, dest } from 'gulp';
import { resolve } from 'path';

const cssDir = resolve(__dirname, 'css');
const themesDir = resolve(__dirname, 'themes');
function ensureEmptyDir(dir: string) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir);
}

function buildStyle() {
  ensureEmptyDir(cssDir);

  const sass = gulpSass(dartSass);

  return src(resolve(__dirname, './packages/theme-chalk/src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCss())
    .pipe(dest(cssDir));
}

export default series(buildStyle);
