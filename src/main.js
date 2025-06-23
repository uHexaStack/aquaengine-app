import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from "./router";
import i18n from '@/common/i18n'
import ApiService from "@common/api/api.service.js";

ApiService.init();

const pinia = createPinia()
const app = createApp(App);

app.use(i18n)
app.use(pinia)
app.use(router);

app.config.errorHandler = (err, vm, info) => {
    console.error('Global error:', info, err)
}

app.mount("#app");