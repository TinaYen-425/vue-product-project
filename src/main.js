import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
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
