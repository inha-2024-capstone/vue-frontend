import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueDaumPostcode from "vue-daum-postcode";
import router from "./router";
import store from "./store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
library.add(fas);
library.add(far);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(store);
app.use(VueDaumPostcode);
app.config.globalProperties.$toast = toast;
app.mount("#app");
if (store.state.accessToken && store.state.refreshToken) {
  store.dispatch("startAuthTimers");
}
