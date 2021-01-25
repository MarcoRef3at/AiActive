const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
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
        name: "Lpr",
        component: () => import("pages/lpr.vue"),
        meta: { permission: ["admin"] }
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("pages/PageSettings.vue"),
        meta: { permission: ["admin"] }
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("pages/users.vue"),
        meta: { permission: ["user"] }
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
    name: "Not Authorized",
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
