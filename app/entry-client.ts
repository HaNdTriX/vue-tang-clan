import { createSSRApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import { createAppRouter } from "./router.ts";

const router = createAppRouter();
const app = createSSRApp(App);

app.use(router);
router.isReady().then(() => app.mount("#app"));
