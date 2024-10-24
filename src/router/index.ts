import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const Layouts = () => import("@/layouts/index.vue");

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "Dashboard",
          svgIcon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/report",
    component: Layouts,
    redirect: "/report/application",
    name: "Report",
    meta: {
      title: "Reports",
      elIcon: "guide",
    },
    children: [
      {
        path: "application",
        component: () => import("@/views/table/element-plus/index.vue"),
        name: "Application",
        meta: {
          title: "Application",
          keepAlive: true,
        },
      },
      {
        path: "productivity",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Productivity",
        meta: {
          title: "Productivity",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/monitoring",
    component: Layouts,
    redirect: "/monitoring/social-media",
    name: "Monitoring",
    meta: {
      title: "Monitoring",
      elIcon: "guide",
    },
    children: [
      {
        path: "social-media",
        component: () => import("@/views/dashboard/index.vue"),
        name: "social-media",
        meta: {
          title: "social-media",
          keepAlive: true,
        },
      },
      {
        path: "sessions",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Sessions",
        meta: {
          title: "Sessions",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/about",
    component: Layouts,
    redirect: "/about",
    children: [
      {
        path: "",
        component: () => import("@/views/AboutView.vue"),
        name: "About",
        meta: {
          title: "About",
          svgIcon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
];

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "Permission",
      svgIcon: "lock",
      roles: ["admin", "user"],
      alwaysShow: true,
    },
    children: [
      {
        path: "page-permission",
        component: () => import("@/views/dashboard/index.vue"),
        name: "PagePermission",
        meta: {
          title: "PagePermission",
          roles: ["admin"],
        },
      },
      {
        path: "directive-permission",
        component: () => import("@/views/dashboard/index.vue"),
        name: "DirectivePermission",
        meta: {
          title: "DirectivePermission",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes: constantRoutes,
});

/** Reset Router */
export function resetRouter() {
  // Note: All dynamic routes must have a Name attribute, otherwise they may not be completely reset.
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route;
      const roles = meta.roles as Array<string>;
      if (name && roles?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    // It is also possible to force refresh the browser, but the interactive experience is not very good
    window.location.reload();
  }
}

export default router;
