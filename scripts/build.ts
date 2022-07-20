import { logger, run } from './utils';
import minimist from 'minimist'; // 解释: 命令行参数

const args = minimist(process.argv.slice(2));

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});

async function main() {
  logger.withBothLn(() => logger.successText('开始打包组件DbPlus...'));

  await run('pnpm', ['bootstrap']);
}
