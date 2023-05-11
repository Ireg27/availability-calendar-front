import { createApp } from 'vue';
import App from './App.vue';
import { router } from "@/router/router";
import "./assets/styles/main.css";
import store from "@/store/store";

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');