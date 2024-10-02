import { ref, watchEffect } from "vue";
import {
  getActiveThemeName,
  setActiveThemeName,
} from "@/utils/cache/local-storage";

const DEFAULT_THEME_NAME = "normal";
type DefaultThemeName = typeof DEFAULT_THEME_NAME;

/** The name of the registered theme, DefaultThemeName is required */
export type ThemeName = DefaultThemeName | "dark" | "dark-blue";

interface ThemeList {
  title: string;
  name: ThemeName;
}

/** Theme List */
const themeList: ThemeList[] = [
  {
    title: "Default",
    name: DEFAULT_THEME_NAME,
  },
  {
    title: "Dark",
    name: "dark",
  },
  {
    title: "Dark Blue",
    name: "dark-blue",
  },
];

/** The name of the theme being applied */
const activeThemeName = ref<ThemeName>(
  getActiveThemeName() || DEFAULT_THEME_NAME
);

/** Setting the Theme */
const setTheme = (value: ThemeName) => {
  activeThemeName.value = value;
};

/** Mount the class on the root element of html */
const setHtmlRootClassName = (value: ThemeName) => {
  document.documentElement.className = value;
};

/** initialization */
const initTheme = () => {
  // watchEffect to collect side effects
  watchEffect(() => {
    const value = activeThemeName.value;
    setHtmlRootClassName(value);
    setActiveThemeName(value);
  });
};

/** Theme hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme };
}
