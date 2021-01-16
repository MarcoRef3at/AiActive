//Router Auth
import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store";
import JWT from "jwt-client";
import routes from "../router/routes";
import { showNotif } from "../functions/fn_ShowNotification";

Vue.use(VueRouter);

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let allowedToEnter = true;

    //Check the data in the required path to go
    to.matched.some(record => {
      //Get LoggedIn value from the store
      let isLoggedIn = store.getters["auth/isLoggedIn"];
      //////console.log("isLoggedIn:", isLoggedIn);

      //if trying to access home page without login
      //redirect to auth page
      if (!isLoggedIn && record.name === "home") {
        ////// console.log("!isLoggedIn && record.name === home");
        next({
          path: "/auth",
          replace: true
        });
        return;
      }
      if ("meta" in record) {
        // ------------------------------------------------------------
        // check if user needs to be logged in to access this page
        if ("requiresAuth" in record.meta) {
          if (record.meta.requiresAuth) {
            console.log("Page requires auth:", to, from);
            // this route requires auth, check if user is logged in
            // if not, redirect to login page.
            if (!isLoggedIn) {
              // User is not logged in, redirect to signin page
              allowedToEnter = false;
              next({
                path: "/auth",
                replace: true,
                // redirect back to original path when done signing in
                query: { redirect: to.fullPath }
              });
              console.log("to.fullPath:", to.fullPath);
            }
          }
        }
        // ------------------------------------------------------------
      }

      if (allowedToEnter) {
        // go to the requested page
        next();
      }
    });
    /////////console.log("store.getters:", store.getters["auth/isLoggedIn"]);
  });
};
