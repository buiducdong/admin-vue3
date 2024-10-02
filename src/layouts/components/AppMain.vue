<script lang="ts" setup>
// import Footer from "./Footer/index.vue";
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <keep-alive>
            <component
              :is="Component"
              :key="route.path"
              class="app-container-grow"
            />
          </keep-alive>
        </transition>
      </router-view>
      <!-- footer -->
      <!-- <Footer /> -->
    </div>
    <!-- Back to top -->
    <el-backtop />
    <!-- Return to top (fixed header) -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  display: flex;
}

.app-scrollbar {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .app-container-grow {
    flex-grow: 1;
  }
}
</style>
