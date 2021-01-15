Router.beforeEach((to, from, next) => {
  let allowedToEnter = true
  to.matched.some((record) => {
    // check if there is meta data
    let isLoggedIn = store.getters['auth/isLoggedIn']
    if (!isLoggedIn && record.name === 'home') {
      next({
        path: '/sign-in',
        replace: true
      })
      return
    }

    if ('meta' in record) {
      // ------------------------------------------------------------
      // check if user needs to be logged in to access this page
      if ('requiresAuth' in record.meta) {
        if (record.meta.requiresAuth) {
          // console.log('Page requires auth:', to, from)
          // this route requires auth, check if user is logged in
          // if not, redirect to login page.
          if (!isLoggedIn) {
            // User is not logged in, redirect to signin page
            allowedToEnter = false
            next({
              path: '/sign-in',
              replace: true,
              // redirect back to original path when done signing in
              query: { redirect: to.fullPath }
            })
          }
        }
      }
      // ------------------------------------------------------------
      // check if user has correct permissions to access this page
      if (allowedToEnter && 'permissions' in record.meta) {
        let canProceed = false
        let permissions = record.meta.permissions
        // get currently logged in user permissions
        let token = store.getters['auth/token']
        // decipher the token
        let session = JWT.read(token)
        // check if they are not an admin (administrator)
        if (session.claim.permissions.administrator) {
          canProceed = true
        }
        else {
          for (let index = 0; index < permissions.length; ++index) {
            let permission = permissions[index]
            // console.log('Permission needed:', permission)
            if (permission === 'administrator') {
              if (session.claim.permissions.administrator) {
                canProceed = true
              }
            }
            else if (permission === 'liveview') {
              if (session.claim.permissions.liveview) {
                canProceed = true
              }
            }