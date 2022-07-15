import type { RouteRecordRaw } from 'vue-router';
const regName = /components\/(.+?)\/index\.vue/;

// 根据目录动态获取组件路由
export const getComponentsRouter = () => {
  const result: RouteRecordRaw[] = [];
  const moduleFiles = import.meta.globEager('../pages/components/**/index.vue');
  Object.keys(moduleFiles).map((path) => {
    console.log('path', path);
    let name = '';
    const matchName = path.match(regName);
    if (matchName) {
      name = matchName[1];
    }
    result.push({
      path: name,
      name: name,
      component: () => import(`../pages/components/${name}/index.vue`),
    });
  });
  return result;
};

// 根据目录动态生成菜单路由

export type menuItem = {
  title: string;
  path: string;
};

export const getComponentsMenu = (): menuItem[] => {
  const result: menuItem[] = [];
  const moduleFiles = import.meta.globEager('../pages/components/**/index.vue');
  Object.keys(moduleFiles).map((path) => {
    let name = '';
    const module = moduleFiles[path].default;
    const matchName = path.match(regName);
    if (matchName) {
      name = matchName[1];
    }
    if (module.title && module.name) {
      result.push({ title: module.title, path: `/components/${name.toLowerCase()}` });
    }
  });
  return result;
};
