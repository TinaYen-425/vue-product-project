import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
// vee-validate
import { Field, Form , ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n"
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from "./App.vue";
import router from "./router";
import { currency, date } from "./methods/filters"

axios.defaults.withCredentials = true;

// vee-validate 設定檔
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
 });
 setLocale('zh_TW'); //強制設立語系為中文字

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.component('Loading', Loading)
app.config.globalProperties.$filters = { currency, date }
// vee-validate 使用
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount("#app");


//全局守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login", 
        });
      }
    });
  } else {
    next(); 
  }
});
