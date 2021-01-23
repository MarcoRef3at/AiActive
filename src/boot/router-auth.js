import { Notify } from "quasar";
import { Axios } from "./axios";
import auth from "../store/auth";
// import enUS from "../i18n/en-us/auth";
/* eslint-disable no-use-before-define */

// import { jsonapiModule } from "jsonapi-vuex";

/* eslint-enable no-use-before-define */
function isArrayOrString(variable) {
  if (typeof variable === typeof [] || typeof variable === typeof "") {
    return true;
  }
  return false;
}

export default ({ app, router, store, Vue }) => {
  // Axios.interceptors.response.use(
  //   response => {
  //     return response;
  //   },
  //   error => {
  //     if (!error.response) {
  //       Notify.create({
  //         message: app.i18n.t("auth.network_error"),
  //         color: "red"
  //       });
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // /**
  //  * Register i18n
  //  */
  // app.i18n.mergeLocaleMessage("en-us", enUS);

  /**
   * Register auth store
   */
  store.registerModule("auth", auth);

  // store.registerModule(
  //   "jv",
  //   jsonapiModule(Axios, { preserveJson: true })
  // );

  /**
   * Set route guard
   */
  router.beforeEach((to, from, next) => {
    let loggedIn = store.getters["auth/isLoggedIn"];
    const record = to.matched.find(record => record.meta.permission);
    //if requires to be loggedIn
    if (record) {
      //check if logged in or not
      store.dispatch("auth/isLoggedIn").then(() => {
        //if Not logged in redirect to auth
        if (!loggedIn) {
          //add redirect
          next({
            path: "/auth",
            replace: true,
            // redirect back to original path when done signing in
            query: { redirect: to.fullPath }
          });
        } else if (
          //if requested route requires a non-owned permission
          isArrayOrString(record.meta.permission) &&
          !store.getters["auth/check"](record.meta.permission)
        ) {
          router.push("/NotAuthorized").catch(err => {});
        } else if (
          //redirect to requested page after login
          loggedIn &&
          record.name === "home" &&
          typeof from.query.redirect != "undefined" &&
          from.query.redirect != "/"
        ) {
          next({
            path: from.query.redirect,
            replace: true
          });
        }
      });
    }
    next();
  });

  //on Refresh Check if user is logged in
  store.dispatch("auth/isLoggedIn").catch(response => {
    console.log("response:", response);
    store.dispatch("auth/logoutUser");
  });
};
