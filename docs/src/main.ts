import { createApp } from 'vue';
import { install } from '@db-plus/components';
import App from './App.vue';

const app = createApp(App);
app.use(install);
app.mount('#app');
