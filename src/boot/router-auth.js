//Router Auth
import { Cookies } from "quasar";
import { showNotif } from "../functions/fn_ShowNotification";
import JWT from "jwt-client";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "../router/routes";
import { store } from "../store";
Vue.use(VueRouter);
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = Cookies.has("token");
    console.log("store:", store.getters["auth/isLoggedIn"]);

    if (loggedIn) {
      let token = Cookies.get("token");
      let decodedToken = JWT.read(token).claim;
      to.matched[1].meta.userStatus = decodedToken.status;
    }

    let isEnabled = to.matched[1].meta.userStatus;

    if (!isEnabled) {
      showNotif("User is Disabled");
    }

    if ((!loggedIn || !isEnabled) && to.path !== "/auth") {
      next("/auth");
    } else {
      next();
    }

    if (loggedIn && to.path == "/auth") {
      next("/");
    }
  });
};
