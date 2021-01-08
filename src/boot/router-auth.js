import { Cookies } from "quasar";
import { tokenDecoder } from "src/functions/fn_TokenDecoder";
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // let loggedIn = Cook ies.has("token");
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
