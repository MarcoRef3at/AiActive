//Cookies Import
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = $cookies.isKey('token');
    if (!loggedIn && to.path !== "/auth") {
      next("/auth");
    } else {
      next();
    }
    if (loggedIn && to.path == "/auth") {
      next("/");
    }
  });
};