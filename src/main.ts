import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "element-plus/dist/index.css";
import store from "./store";
import SvgIcon from "../src/components/SvgIcon/index.vue";
import "@/router/permission";

import "@/styles/index.scss"; // global css
import "./icons/index";
import { loadPlugins } from "./plugins";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.use(store);

app.use(router);

loadPlugins(app);

router.isReady().then(() => {
  app.mount("#app");
});
