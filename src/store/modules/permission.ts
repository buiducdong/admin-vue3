/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { type RouteRecordRaw } from "vue-router";
import { constantRoutes, dynamicRoutes } from "@/router";
import { flatMultiLevelRoutes } from "@/router/helper";
import routeSettings from "@/config/route";

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles as Array<any>;
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true;
};

const filterDynamicRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tempRoute = { ...route };
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, roles);
      }
      res.push(tempRoute);
    }
  });
  return res;
};

export const usePermissionStore = defineStore("permission", () => {
  /** Accessible Routes */
  const routes = ref<RouteRecordRaw[]>([]);
  /** Dynamic routing with access permissions */
  const addRoutes = ref<RouteRecordRaw[]>([]);

  /** Generate accessible routes based on roles (accessible routes = resident routes + dynamic routes with access permissions) */
  const setRoutes = (roles: string[]) => {
    const accessedRoutes = filterDynamicRoutes(dynamicRoutes, roles);
    _set(accessedRoutes);
  };

  /** All routes = all resident routes + all dynamic routes */
  const setAllRoutes = () => {
    _set(constantRoutes);
  };

  const _set = (accessedRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(accessedRoutes);
    addRoutes.value = routeSettings.thirdLevelRouteCache
      ? flatMultiLevelRoutes(accessedRoutes)
      : accessedRoutes;
  };

  return { routes, addRoutes, setRoutes, setAllRoutes };
});

/** Use outside of setup */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
