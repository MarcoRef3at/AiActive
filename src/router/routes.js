const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: {
          title: "Home",
          userStatus: true,
          requiresAuth: true,
          permissions: ["user"]
        }
      }
    ]
  },
  {
    path: "/lpr/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/lpr.vue"),
        meta: {
          title: "lpr",
          userStatus: true,
          requiresAuth: true,
          permissions: ["publisher"]
        }
      }
    ]
  },
  {
    path: "/users/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/users.vue"),
        meta: {
          title: "users",
          userStatus: true,
          requiresAuth: true,
          permissions: ["admin"]
        }
      }
    ]
  },
  {
    path: "/settings/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Settings.vue"),
        meta: {
          title: "Settings",
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
          title: "Auth"
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
