import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "./assets/main.css";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";

const app = createApp(App);
app.config.productionTip = false;

app.use(router);

app.mount("#app");
