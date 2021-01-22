
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/Login')
      },
      {
        path: '/logout',
        name: 'logout',
        component: () => import('pages/auth/Logout')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/auth/Register')
      },
      {
        path: '/verification',
        name: 'verification',
        component: () => import('pages/auth/Verification')
      },
      {
        path: '/password',
        name: 'password',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'forgot',
            name: 'forgot',
            component: () => import('pages/auth/password/Forgot')
          },
          {
            path: 'reset',
            name: 'reset',
            component: () => import('pages/auth/password/Reset')
          }
        ]
      },
      {
        path: '/account',
        meta: { auth: true },
        name: 'account',
        component: () => import('pages/auth/Account')
      },
      {
        path: '/admin',
        meta: { auth: ['admin'] },
        name: 'admin',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'home',
            name: 'adminHome',
            component: () => import('pages/auth/Admin')
          }
        ]
      },
      {
        path: '/superuser',
        meta: { auth: ['superuser'] },
        name: 'superuser',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'users',
            name: 'superuserUsers',
            component: () => import('pages/auth/Users')
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
