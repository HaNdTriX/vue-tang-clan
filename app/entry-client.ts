import { createSSRApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";

const app = createSSRApp(App);
const router = createRouter({ history: createWebHistory(), routes });
const head = createHead();

app.use(router);
app.use(head);

router.isReady().then(() => app.mount("#root"));
