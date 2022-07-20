import execa from 'execa';
import chalk from 'chalk';
import { resolve } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import { prompt } from 'enquirer';
import type { Options } from 'execa';

type LogFn = () => void;

export const rootDir = resolve(__dirname, '..');
export const componentsDir = resolve(rootDir, 'packages/components');

export const allComponents = readdirSync(componentsDir).filter((f) => {
  const path = resolve(componentsDir, f);

  if (!statSync(path).isDirectory()) {
    return false;
  }

  return existsSync(`${path}/index.ts`);
});

// 执行脚本
export async function run(bin: string, args: string[], opts: Options = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts });
}

// 打印日志
export const logger = {
  ln: () => console.log(),
  withStartLn: (log: LogFn) => (logger.ln(), log()),
  withEndLn: (log: LogFn) => (log(), logger.ln()),
  withBothLn: (log: LogFn) => (logger.ln(), log(), logger.ln()),
  warning: (msg: string) => {
    console.warn(`${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(msg)}`);
  },
  info: (msg: string) => {
    console.log(`${chalk.bgCyan.black(' INFO ')} ${chalk.cyan(msg)}`);
  },
  success: (msg: string) => {
    console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.green(msg)}`);
  },
  error: (msg: string) => {
    console.error(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(msg)}`);
  },
  warningText: (msg: string) => {
    console.warn(`${chalk.yellow(msg)}`);
  },
  infoText: (msg: string) => {
    console.log(`${chalk.cyan(msg)}`);
  },
  successText: (msg: string) => {
    console.log(`${chalk.green(msg)}`);
  },
  errorText: (msg: string) => {
    console.error(`${chalk.red(msg)}`);
  },
};

// 短横线命名
export function toKebabeCase(value: string) {
  return (
    value.charAt(0).toLocaleLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLocaleLowerCase()
  );
}

// 全大写命令
export function toCapitalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
  );
}

// 驼峰命名
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value);

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1);
}

const packages = [
  'db-plus',
  // 'plaground',
  'packages/config',
  'packages/hooks',
  'packages/utils',
];

// 获取打包信息
export async function getPackageInfo(inputPkg: string) {
  let pkgName: string | null = null;

  if (packages.includes(inputPkg)) {
    pkgName = inputPkg;
  } else {
    let options = inputPkg ? packages.filter((p) => p.includes(inputPkg)) : packages;

    if (!options.length) {
      options = packages;
    } else if (options.length === 1) {
      pkgName = options[0];
    } else {
      pkgName = (
        await prompt<{ pkgName: string }>({
          type: 'select',
          name: 'pkgName',
          message: 'Select release package:',
          choices: options,
        })
      ).pkgName;
    }
  }

  if (!pkgName) {
    throw new Error('Release package must not be null');
  }

  const isRoot = pkgName === 'db-plus';
  const pkgDir = resolve(__dirname, isRoot ? '..' : `../${pkgName}`);
  const pkgPath = resolve(pkgDir, 'package.json');

  if (!existsSync(pkgPath)) {
    throw new Error(`Release package ${pkgName} not found`);
  }

  const pkg = require(pkgPath);

  if (pkg.private) {
    throw new Error(`Release package ${pkgName} is private`);
  }

  return {
    pkgName,
    pkgDir,
    pkgPath,
    pkg,
    isRoot,
    currentVersion: pkg.version,
  };
}
