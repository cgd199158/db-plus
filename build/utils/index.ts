import { spawn } from 'child_process'; // 产卵,子进程
import { projectRoot } from './paths';

export const withTaskName = <T>(name: string, fn: T) => Object.assign(fn, { displayName: name });

// 在node使用子进程来运行脚本
export const run = async (command: string) => {
  // rm -rf
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(' ');
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit', //直接将这个子进程的输出共享给父进程
      shell: true, // 默认情况下 linux 才支持 rm -rf (我在电脑里安装了git bash)
    });
    app.on('close', resolve);
  });
};
