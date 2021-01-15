const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: {
          userStatus: true,
          requiresAuth: true,
          permissions: ["user"]
        }
      }
    ]
  },
  {
    path: "/settings",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Settings.vue"),
        meta: {
          userStatus: true,
          requiresAuth: true,
          permissions: ["admin"]
        }
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageAuth.vue"),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
