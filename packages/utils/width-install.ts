import type { App, Plugin } from 'vue';
// 类型必须导出
export type SFCwithInstall<T> = T & Plugin;

export const withInstall = <T>(comp: T) => {
  (comp as SFCwithInstall<T>).install = function (app: App) {
    app.component((<any>comp).name, comp);
  };
  return comp as SFCwithInstall<T>;
};
