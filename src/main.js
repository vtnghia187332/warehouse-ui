import Vue from "vue";
import Vuex from "vuex";
import router from "./router/index";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

// install rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
import App from "./App";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

import "./css/index.scss";
Vue.use(ElementUI, { locale }).use(PaperDashboard).use(Vuex);

import storeConfigs from "./store";
const store = new Vuex.Store(storeConfigs);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
