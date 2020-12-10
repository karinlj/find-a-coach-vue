import Vue from "vue";
import App from "./App.vue";
import coachRouter from "./router";
import { store } from "./store";
import BaseCard from "./components/ui/BaseCard";
import BaseBtn from "./components/ui/BaseBtn";
import BaseBadge from "./components/ui/BaseBadge";
import BaseSpinner from "./components/ui/BaseSpinner";
import BaseDialog from "./components/ui/BaseDialog";

Vue.config.productionTip = false;
//register global components
Vue.component("base-card", BaseCard);
Vue.component("base-btn", BaseBtn);
Vue.component("base-badge", BaseBadge);
Vue.component("base-spinner", BaseSpinner);
Vue.component("base-dialog", BaseDialog);

new Vue({
  store: store,
  router: coachRouter,
  render: (h) => h(App),
}).$mount("#app");
