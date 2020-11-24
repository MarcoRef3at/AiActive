const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Dashboard.vue") }]
  },
  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageAuth.vue") }]
  },
  {
    path: "/Report",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageReportingModule.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
