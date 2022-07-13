import { createApp } from 'vue';
import { install } from '@db-plus/components';
import '@db-plus/theme-chalk/src/index.scss';
import App from './App.vue';
import { router } from './router';

const app = createApp(App);
app.use(install);
app.use(router);
app.mount('#app');
