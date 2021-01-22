//okkkk
import Vue from "vue";
import VueRouter from "vue-router";
import JWT from "jwt-client";
import { Cookies } from "quasar";
import { showNotif } from "../functions/fn_ShowNotification";
import auth from "../store/auth";

Vue.use(VueRouter);

export default ({ router, store }) => {
  store.registerModule("auth", auth);

  router.beforeEach((to, from, next) => {
    let allowedToEnter = true;
    store.dispatch("auth/isLoggedIn").then(() => {
      //Check the data in the required path to go
      to.matched.some(record => {
        //Get LoggedIn value from the store & cookies
        const hasCookies = Cookies.has("token");
        const isLoggedIn = hasCookies;

        //if trying to access home page without login
        //redirect to auth page
        if (!isLoggedIn && record.meta.title === "home") {
          next({
            path: "/auth",
            replace: true
          });
        }
        // ------------------------------------------------------------
        //If there's a redirect meta go to this path
        else if (
          isLoggedIn &&
          record.meta.title === "home" &&
          typeof from.query.redirect != "undefined" &&
          from.query.redirect != "/"
        ) {
          next({
            path: from.query.redirect,
            replace: true
          });
        } else {
          next();
        }
        // ------------------------------------------------------------

        if ("meta" in record) {
          // check if user needs to be logged in to access this page
          if ("requiresAuth" in record.meta) {
            if (record.meta.requiresAuth) {
              // console.log("Page requires auth:", to, from);
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
                return;
              }
            }
          }

          // ------------------------------------------------------------
          // check if user has correct permissions to access this page
          if (allowedToEnter && "permissions" in record.meta) {
            let canProceed = false;
            let permissions = record.meta.permissions;
            // get currently logged in user permissions
            let token = Cookies.get("token");
            // decipher the token
            let session = JWT.read(token);
            // check if they are not an admin
            if (session.claim.role == "admin") {
              canProceed = true;
            } else {
              for (let index = 0; index < permissions.length; ++index) {
                let requiredPermission = permissions[index];
                if (requiredPermission == session.claim.role) {
                  canProceed = true;
                } else {
                  next("/not-authorized");
                }
              }
            }

            if (!canProceed) {
              allowedToEnter = false;
              // redirect to previous page
              // next(from.fullPath);
              next("/not-authorized");
            }
          }
        }

        if (allowedToEnter) {
          // go to the requested page
          next();
        }
      });
    });
  });

  //Change Tab Title to be with page name
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      document.title = "Aiactive - " + to.meta.title;
    });
  });
};
