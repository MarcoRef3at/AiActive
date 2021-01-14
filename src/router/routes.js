const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { userStatus: false }
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
        meta: { userStatus: false }
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageAuth.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
