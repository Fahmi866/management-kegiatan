import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // pastikan tailwind aktif

createApp(App).use(router).mount('#app');