// 打包样式
// pnpm install gulp-sass @types/gulp-sass sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css -D -w
// 串行依次打包
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';

import { series, src, dest } from 'gulp';
import path from 'path';

function compile() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(dest('./dist/css'));
}

function copyfont() {
  return src(path.resolve(__dirname, 'src/fonts/**')).pipe(cleanCss()).pipe(dest('./dist/fonts'));
}

function copyfullStyle() {
  return src(path.resolve(__dirname, './dist/**')).pipe(
    dest(path.resolve(__dirname, '../../dist/')),
  );
}

export default series(compile, copyfont, copyfullStyle);
