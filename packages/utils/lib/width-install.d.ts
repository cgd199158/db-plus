import type { Plugin } from 'vue';
export declare type SFCwithInstall<T> = T & Plugin;
export declare const withInstall: <T>(comp: T) => SFCwithInstall<T>;
