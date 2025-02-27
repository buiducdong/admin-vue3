<script lang="ts" setup>
import { useDevice } from "@/hooks/useDevice";
import useResize from "./hooks/useResize";
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
import { AppMain, Sidebar, NavigationBar } from "./components";

/** Layout Responsive */
useResize();

const { isMobile } = useDevice();
const appStore = useAppStore();

/** Calculation layout Classes */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: isMobile.value,
  };
});

/** Used to handle the event of clicking the sidebar mask layer on the mobile side */
const handleClickOutside = () => {
  appStore.closeSidebar(false);
};
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- Mobile sidebar mask -->
    <div
      v-if="layoutClasses.mobile && layoutClasses.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- Left Sidebar -->
    <Sidebar class="sidebar-container" />
    <!-- Main Container -->
    <div class="main-container">
      <!-- Header navigation bar and tab bar -->
      <div class="fixed-header layout-header">
        <NavigationBar />
      </div>
      <!-- Page content -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--v3-sidebar-border-right);
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.fixed-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  position: relative;
  z-index: 9;
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--v3-header-box-shadow);
  border-bottom: var(--v3-header-border-bottom);
}

.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

// .hasTagsView {
//   .app-main {
//     min-height: calc(100vh - var(--v3-header-height));
//   }
//   .fixed-header + .app-main {
//     padding-top: var(--v3-header-height);
//   }
// }

.hideSidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// with mobile device
.mobile {
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--v3-sidebar-width) !important;
  }
  .main-container {
    margin-left: 0px;
  }
  .fixed-header {
    width: 100%;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
