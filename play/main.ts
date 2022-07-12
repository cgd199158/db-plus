import { createApp } from 'vue';
import App from './App.vue';
import DbPlus from 'db-plus/index.js';
console.log('DbPlus', DbPlus);
const app = createApp(App);
// app.use(DbPlus);

app.mount('#app');
