import Vue from "vue";
import VueRouter from "vue-router";
import JWT from "jwt-client";
import { Cookies } from "quasar";
import { showNotif } from "../functions/fn_ShowNotification";

Vue.use(VueRouter);

export default async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    let allowedToEnter = true;

    //Check the data in the required path to go
    to.matched.some(record => {
      //Get LoggedIn value from the store & cookies
      let hasCookies = Cookies.has("token");
      let isLoggedIn = store.getters["auth/isLoggedIn"];
      //////// console.log("isLoggedIn:", isLoggedIn);

      //if trying to access home page without login
      //redirect to auth page
      if (!isLoggedIn && record.meta.title === "home") {
        next({
          path: "/auth",
          replace: true
        });
      }
      if ("meta" in record) {
        // ------------------------------------------------------------
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
              // console.log("to.fullPath:", to.fullPath);
              return;
            }
          }
        }
        // ------------------------------------------------------------
        // check if user has correct permissions to access this page
        if (allowedToEnter && "permissions" in record.meta) {
          let canProceed = false;
          let permissions = record.meta.permissions;
          // console.log("permissions:", permissions);
          // get currently logged in user permissions
          // let token = store.getters["auth/token"];
          const token = Cookies.get("token");
          console.log("token:", token);
          // decipher the token
          let session = JWT.read(token);
          // console.log("session.claim.role:", session.claim.role);
          // check if they are not an admin (administrator)
          if (session.claim.role == "admin") {
            canProceed = true;
          } else {
            for (let index = 0; index < permissions.length; ++index) {
              let requiredPermission = permissions[index];
              // console.log("Permission needed:", requiredPermission);
              if (requiredPermission === "admin") {
                if (session.claim.role == "admin") {
                  canProceed = true;
                }
              } else if (requiredPermission === "user") {
                if (session.claim.role == "user") {
                  canProceed = true;
                }
              } else if (requiredPermission === "publisher") {
                if (session.claim.role == "publisher") {
                  canProceed = true;
                }
              } else {
                console.error(
                  "Unknown permission in Router.beforeEach:",
                  requiredPermission
                );
              }
            }
          }

          if (!canProceed) {
            allowedToEnter = false;
            // redirect to previous page
            next(from.fullPath);
            let pageName = record.components.default.name;
            let role = session.claim.role;
            console.log("role:", role);
            showNotif(
              `${role}s are not Authorized to access ${pageName} `,
              ` only ${permissions}s can access`
            );
          }
        }
      }

      if (allowedToEnter) {
        // go to the requested page
        next();
      }
    });
    /////////// console.log("store.getters:", store.getters["auth/isLoggedIn"]);
  });

  //Change Tab Title to be with page name
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      document.title = "Aiactive - " + to.meta.title;
    });
  });
};
