import { logger, run } from './utils';
import minimist from 'minimist'; // 解释: 命令行参数

// $ node example/parse.js -a beep -b boop
// { _: [], a: 'beep', b: 'boop' }
const args = minimist(process.argv.slice(2));

const devOnly = args.dev || args.d;
const sourceMap = args.sourcemap || args.s;
const release = args.release || args.r;

const env = devOnly ? 'development' : 'production';

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});

async function main() {
  logger.withBothLn(() => logger.successText('开始打包组件DbPlus...'));

  await run('pnpm', ['bootstrap']);

  await run('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      OUT_DIR: 'es',
      FORMAT: 'es',
      SOURCE_MAP: sourceMap ? 'true' : '',
    },
  });

  await run('vite', ['build', '--config', 'vite.config.ts'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: env,
      OUT_DIR: 'lib',
      FORMAT: 'cjs',
      SOURCE_MAP: sourceMap ? 'true' : '',
    },
  });
}
