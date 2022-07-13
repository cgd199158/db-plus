import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'components',
        name: 'components',
        component: () => import('../components/layout/component/index.vue'),
        redirect: '/Components/button',
        children: [
          {
            path: 'button',
            name: 'button',
            component: () => import('../pages/components/button/index.vue'),
          },
        ],
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});
