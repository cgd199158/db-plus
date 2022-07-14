import { createApp } from 'vue';
import { install } from '@db-plus/components';
import App from './App.vue';
import { router } from './router';
import './styles/index.scss';

const app = createApp(App);
app.use(install);
app.use(router);
app.mount('#app');
