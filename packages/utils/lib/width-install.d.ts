import type { Plugin } from 'vue';
export declare type SFCWidthInstall<T> = T & Plugin;
export declare const widthInstall: <T>(comp: T) => SFCWidthInstall<T>;
