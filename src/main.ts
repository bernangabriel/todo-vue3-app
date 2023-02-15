import { createApp } from 'vue';
import router from './router';

//components
import App from './App.vue';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).mount('#app');
