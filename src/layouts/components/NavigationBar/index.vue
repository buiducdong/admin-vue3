<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { UserFilled } from "@element-plus/icons-vue";
import Hamburger from "../Hamburger/index.vue";
import Breadcrumb from "../Breadcrumb/index.vue";
// import Notify from "@/components/Notify/index.vue";
// import SearchMenu from "@/components/SearchMenu/index.vue";

const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

/** Toggle Sidebar */
const toggleSidebar = () => {
  appStore.toggleSidebar(false);
};

/** logout */
const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="navigation-bar">
    <Hamburger
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <!-- <SearchMenu class="right-menu-item" />
      <Notify class="right-menu-item" /> -->
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <img
            v-if="userStore.roles.includes('admin')"
            src="@/assets/logo-default.gif"
            class="user-avatar"
          />
          <el-avatar v-else :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="#">
              <el-dropdown-item>Profile</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  color: var(--v3-navigationbar-text-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary) !important;
        }
      }
    }
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
