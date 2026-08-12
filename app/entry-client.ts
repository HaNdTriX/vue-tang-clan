import { createSSRApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import "./assets/style.css";
import App from "./App.vue";

const router = createRouter({ history: createWebHistory(), routes });
const app = createSSRApp(App);

app.use(router);
router.isReady().then(() => app.mount("#app"));
