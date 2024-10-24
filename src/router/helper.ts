import {
  type Router,
  type RouteRecordNormalized,
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { cloneDeep, omit } from "lodash-es";

/** Routing Mode */
export const history =
  process.env.VUE_APP_ROUTER_HISTORY === "hash"
    ? createWebHashHistory(process.env.VUE_APP_PUBLIC_PATH)
    : createWebHistory(process.env.VUE_APP_PUBLIC_PATH);

/** Route downgrade (convert level 3 or higher routes to level 2 routes) */
export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  const routesMirror = cloneDeep(routes);
  routesMirror.forEach((route) => {
    // If the route is level 3 or above, downgrade it
    isMultipleRoute(route) && promoteRouteLevel(route);
  });
  return routesMirror;
};

/** Determine whether the routing level is greater than 2 */
const isMultipleRoute = (route: RouteRecordRaw) => {
  const children = route.children;
  if (children?.length) {
    return children.some((child) => child.children?.length);
  }
  return false;
};

/** Generate secondary routes */
const promoteRouteLevel = (route: RouteRecordRaw) => {
  let router: Router | null = createRouter({
    history,
    routes: [route],
  });
  const routes = router.getRoutes();
  addToChildren(routes, route.children || [], route);
  router = null;
  // After switching to secondary routing, remove children from all subroutes
  route.children = route.children?.map(
    (item) => omit(item, "children") as RouteRecordRaw
  );
};

/** Adds the given subroute to the specified routing module. */
const addToChildren = (
  routes: RouteRecordNormalized[],
  children: RouteRecordRaw[],
  routeModule: RouteRecordRaw
) => {
  children.forEach((child) => {
    const route = routes.find((item) => item.name === child.name);
    if (route) {
      // Initialize routeModule's children
      routeModule.children = routeModule.children || [];
      // If the route is not included in the children property of routeModule, add it
      if (!routeModule.children.includes(route)) {
        routeModule.children.push(route);
      }
      // If the sub-route has its own sub-routes, this function will be recursively called to add them as well.
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule);
      }
    }
  });
};
