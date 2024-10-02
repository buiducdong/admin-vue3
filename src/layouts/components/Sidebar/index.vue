<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import SidebarItem from "./SidebarItem.vue";
import Logo from "../Logo/index.vue";
import { getCssVariableValue } from "@/utils";

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color");
const v3SidebarMenuTextColor = getCssVariableValue(
  "--v3-sidebar-menu-text-color"
);
const v3SidebarMenuActiveTextColor = getCssVariableValue(
  "--v3-sidebar-menu-active-text-color"
);

const route = useRoute();
const appStore = useAppStore();
const permissionStore = usePermissionStore();

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path,
  } = route;
  return activeMenu ? activeMenu : path;
});
const noHiddenRoutes = computed(() =>
  permissionStore.routes.filter((item) => !item.meta?.hidden)
);
const isCollapse = computed(() => !appStore.sidebar.opened);
const isLogo = true;
const backgroundColor = v3SidebarMenuBgColor;
const textColor = v3SidebarMenuTextColor;
const activeTextColor = v3SidebarMenuActiveTextColor;
const sidebarMenuItemHeight = "var(--v3-sidebar-menu-item-height)";
const sidebarMenuHoverBgColor = "var(--v3-sidebar-menu-hover-bg-color)";
const tipLineWidth = "2px";
// Hide vertical scrollbar when in top mode
const hiddenScrollbarVerticalBar = "none";
</script>

<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="'vertical'"
      >
        <SidebarItem
          v-for="route in noHiddenRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(101% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 101%;
  :deep(.scrollbar-wrapper) {
    // Limit horizontal width
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // Scrollbars
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      display: none;
    }
    &.is-vertical {
      display: v-bind(hiddenScrollbarVerticalBar);
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item.is-active) {
  @extend %tip-line;
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      @extend %tip-line;
    }
  }
}
</style>
