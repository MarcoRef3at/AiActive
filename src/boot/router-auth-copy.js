import Vue from "vue";
import VueRouter from "vue-router";

import routes from "../router/routes";
import store from "../store";

import JWT from "jwt-client";

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

Router.beforeEach((to, from, next) => {
  let allowedToEnter = true;
  to.matched.some(record => {
    // check if there is meta data
    let isLoggedIn = store.getters["auth/isLoggedIn"];
    console.log("isLoggedIn:", isLoggedIn);
    console.log("record:", record);
    if (!isLoggedIn && record.name === "PageIndex") {
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
          // console.log('Page requires auth:', to, from)
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
          }
        }
      }
      // ------------------------------------------------------------
      // check if user has correct permissions to access this page
      if (allowedToEnter && "permissions" in record.meta) {
        let canProceed = false;
        let permissions = record.meta.permissions;
        // get currently logged in user permissions
        let token = store.getters["auth/token"];
        // decipher the token
        let session = JWT.read(token);
        // check if they are not an admin (administrator)
        if (session.claim.permissions.administrator) {
          canProceed = true;
        } else {
          for (let index = 0; index < permissions.length; ++index) {
            let permission = permissions[index];
            // console.log('Permission needed:', permission)
            if (permission === "administrator") {
              if (session.claim.permissions.administrator) {
                canProceed = true;
              }
            } else if (permission === "liveview") {
              if (session.claim.permissions.liveview) {
                canProceed = true;
              }
            } else if (permission === "archive") {
              if (session.claim.permissions.archive) {
                canProceed = true;
              }
            } else if (permission === "alarmsArchiveEvents") {
              if (session.claim.permissions.alarmsArchiveEvents) {
                canProceed = true;
              }
            } else if (permission === "remoteAccess") {
              if (session.claim.permissions.remoteAccess) {
                canProceed = true;
              }
            } else if (permission === "settings") {
              if (session.claim.permissions.settings) {
                canProceed = true;
              }
            } else {
              console.error(
                "Unknown permission in Router.beforeEach:",
                permission
              );
            }
          }
        }

        if (!canProceed) {
          allowedToEnter = false;
          // redirect to not-authorized page
          next({
            path: "/not-authorized",
            replace: true
          });
        }
      }
    }
  });

  if (allowedToEnter) {
    // go to the requested page
    next();
  }
});

export default Router;
