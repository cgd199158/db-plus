import { createApp } from 'vue';
import App from './App.vue';
import DbIcon from '@db-plus/components/icon';
import '@db-plus/theme-chalk/src/index.scss';

const app = createApp(App);
app.use(DbIcon);

app.mount('#app');
