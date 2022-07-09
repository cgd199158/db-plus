import type { App, Plugin } from 'vue';
// 类型必须导出
export type SFCWidthInstall<T> = T & Plugin;

export const widthInstall = <T>(comp: T) => {
  (comp as SFCWidthInstall<T>).install = function (app: App) {
    app.component((<any>comp).name, comp);
  };
  return comp as SFCWidthInstall<T>;
};
