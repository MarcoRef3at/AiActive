const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/Index.vue"),
        meta: { permission: true }
      },
      {
        path: "/auth",
        name: "auth",
        component: () => import("pages/PageAuth.vue")
      },
      {
        path: "/lpr",
        name: "lpr",
        component: () => import("pages/lpr.vue"),
        meta: { permission: ["admin"] }
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("pages/settings.vue"),
        meta: { permission: ["admin"] }
      },
      {
        path: "/users",
        name: "users",
        component: () => import("pages/users.vue"),
        meta: { permission: ["admin"] }
      },
      {
        path: "/not-authorized",
        name: "not-authorized",
        component: () => import("pages/NotAuthorized.vue"),
        meta: { permission: ["admin"] }
      }
    ]
  },
  {
    path: "/NotAuthorized",
    component: () => import("pages/NotAuthorized.vue"),
    meta: { permission: true }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
