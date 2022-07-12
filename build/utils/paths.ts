import { resolve } from 'path';

export const projectRoot = resolve(__dirname, '../../');
export const buildOutput = resolve(projectRoot, 'dist');
export const dpOutput = resolve(buildOutput, 'db');
