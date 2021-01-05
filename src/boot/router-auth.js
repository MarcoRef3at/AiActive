import { Cookies } from "quasar";
import { tokenDecoder } from "src/functions/fn_TokenDecoder";
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // let loggedIn = Cookies.has("token");
    console.log("tokenDecoder(Cookies):", tokenDecoder(Cookies));
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
