import Vue from "vue";
import Vuex from "vuex";
import router from "./router/index";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import VueECharts from "vue-echarts";
import "echarts";

import App from "./App";
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("v-chart", VueECharts);
extend("required", {
  ...required,
  message: "Đây là ô bắt buộc nhập",
});
extend("email", {
  ...email,
  message: "Cần nhập đúng định dạng Email",
});

import "./css/index.scss";
Vue.use(ElementUI, { locale }).use(PaperDashboard).use(Vuex);

import storeConfigs from "./store";
const store = new Vuex.Store(storeConfigs);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  VueECharts,
  render: (h) => h(App),
}).$mount("#app");
