import { Notify } from "quasar";
import { Axios } from "./axios";
import auth from "../store/auth";
// import enUS from "../i18n/en-us/auth";
import { isLoggedIn } from "./../store/auth/getters";

function isArrayOrString(variable) {
  if (typeof variable === typeof [] || typeof variable === typeof "") {
    return true;
  }
  return false;
}

export default ({ app, router, store, Vue }) => {
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (!error.response) {
        Notify.create({
          message: "Network Error",
          color: "red"
        });
      }
      return Promise.reject(error);
    }
  );

  // /**
  //  * Register i18n
  //  */
  // app.i18n.mergeLocaleMessage("en-us", enUS);

  /**
   * Register auth store
   */
  store.registerModule("auth", auth);

  /**
   * Set route guard
   */
  router.beforeEach((to, from, next) => {
    console.log("beforeroute");
    console.log("from:", from);
    console.log("to:", to);
    let loggedIn = false;
    const record = to.matched.find(record => record.meta.permission);
    console.log("record:");
    //to prevent rendering restricted pages before redirecting to "Not-Authorized" page
    if (to.fullPath != "/auth") {
      //if requires to be loggedIn
      if (record) {
        //check if logged in or not
        store.dispatch("auth/isLoggedIn").then(() => {
          console.log("storedispatch:");
          loggedIn = store.getters["auth/isLoggedIn"];
          console.log("loggedIn:", loggedIn);
          //if Not logged in redirect to auth
          if (!loggedIn) {
            console.log("not logged in");
            //add redirect
            next({
              path: "/auth",
              replace: true,
              // redirect back to original path when done signing in
              query: { redirect: to.fullPath }
            });
            console.log("NOToggedIn to:", to.fullPath);
          } else if (
            //if requested route requires a non-owned permission
            isArrayOrString(record.meta.permission) &&
            !store.getters["auth/check"](record.meta.permission)
          ) {
            console.log(
              "loggedIn:",
              store.getters["auth/check"](record.meta.permission)
            );
            Notify.create({
              message: "Not Authorized To Access This Page",
              color: "red"
            });
            // router.push("/NotAuthorized").catch(err => {});
            next({
              path: from.fullPath,
              replace: true
            });
          } else if (
            //redirect to requested page after login
            loggedIn &&
            record.name === "Home" &&
            typeof from.query.redirect != "undefined" &&
            from.query.redirect != "/"
          ) {
            console.log("redirect from", from.fullPath);
            next({
              path: from.query.redirect,
              replace: true
            });
          } else if (loggedIn) {
            console.log("if loggedIn next1");
            next();
          }
        });
      }
    } else {
      console.log("next2");
      next();
    }
    next();
  });

  //on Refresh Check if user is logged in
  store.dispatch("auth/isLoggedIn").catch(() => {
    // store.dispatch("auth/logoutUser");
  });

  //Change Tab Title to be with page name
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      document.title = "Aiactive - " + to.name;
    });
  });
};
