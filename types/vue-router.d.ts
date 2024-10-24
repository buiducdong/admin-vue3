import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;

    svgIcon?: string;

    elIcon?: string;

    hidden?: boolean;

    roles?: string[];

    breadcrumb?: boolean;

    affix?: boolean;

    alwaysShow?: boolean;

    activeMenu?: string;

    keepAlive?: boolean;
  }
}
