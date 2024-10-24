/** localStorage */

import CacheKey from "@/constants/cache-key";
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key";
import { type ThemeName } from "@/hooks/useTheme";

export const removeConfigLayout = () => {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT);
};
//#endregion

//#region Sidebar Status
export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS);
};
export const setSidebarStatus = (
  sidebarStatus: SidebarOpened | SidebarClosed
) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus);
};
//#endregion

//#region The name of the theme being applied
export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null;
};
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName);
};
//#endregion

export const getCachedViews = () => {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS);
  return JSON.parse(json ?? "[]") as string[];
};
export const setCachedViews = (views: string[]) => {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views));
};
//#endregion

export const getUserName = () => {
  return localStorage.getItem(CacheKey.USER_NAME);
};
export const setUserName = (userName: string) => {
  localStorage.setItem(CacheKey.USER_NAME, userName);
};
export const removeUserName = () => {
  localStorage.removeItem(CacheKey.USER_NAME);
};
export const getRoles = () => {
  const json = localStorage.getItem(CacheKey.ROLES);
  return JSON.parse(json ?? "[]") as string[];
};
export const setRoles = (roles: string[]) => {
  localStorage.setItem(CacheKey.ROLES, JSON.stringify(roles));
};
export const removeRoles = () => {
  localStorage.removeItem(CacheKey.ROLES);
};
