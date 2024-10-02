import { type RouteLocationNormalized } from "vue-router";

/** Login-free whitelist (matching route path) */
const whiteListByPath: string[] = ["/login"];

/** Login-free whitelist (matching route name) */
const whiteListByName: string[] = [];

/** Determine whether it is in the whitelist */
const isWhiteList = (to: RouteLocationNormalized) => {
  // Either path or name must match.
  return (
    whiteListByPath.indexOf(to.path) !== -1 ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    whiteListByName.indexOf(to.name as any) !== -1
  );
};

export default isWhiteList;
