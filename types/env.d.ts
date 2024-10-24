declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_TITLE: string;
    VUE_APP_BASE_API: string;
    VUE_APP_ROUTER_HISTORY: "hash" | "html5";
    VUE_APP_PUBLIC_PATH: string;
  }
}
