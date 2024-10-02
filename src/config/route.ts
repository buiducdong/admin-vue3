/** Routing Configuration */
interface RouteSettings {
  /**
   * Do you want to enable the dynamic routing function?
   * 1. After enabling, the backend needs to cooperate to return the fields that the current user can use to determine and load dynamic routing in the user details query interface (the project uses the roles field)
   * 2. If the project does not need to display different pages according to different users, dynamic: false should be used
   */
  dynamic: boolean;
  /** 当动态路由功能关闭时：
   * 1. All routes should be written into the resident route (indicating that all logged-in users can access the same pages)
   * 2. The system automatically assigns a default role to the currently logged-in user that has no effect
   */
  defaultRoles: Array<string>;
  /**
   * Do you want to enable the caching function for level 3 and above routes?
   * 1. If enabled, the routes will be downgraded (level 3 and above routes will be converted to level 2 routes)
   * 2. Since all routes will be converted to level 2 routes, the embedded sub-routes of level 2 and above routes will be invalid
   */
  thirdLevelRouteCache: boolean;
}

const routeSettings: RouteSettings = {
  dynamic: true,
  defaultRoles: ["DEFAULT_ROLE"],
  thirdLevelRouteCache: false,
};

export default routeSettings;
