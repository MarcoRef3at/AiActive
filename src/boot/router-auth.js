import { Cookies } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = Cookies.has("token");
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
