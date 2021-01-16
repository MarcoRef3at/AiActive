import { Cookies } from "quasar";
import { showNotif } from "../functions/fn_ShowNotification";
import JWT from "jwt-client";
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = Cookies.has("token");

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
