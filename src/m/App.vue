<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<script>
  // 引入PWA缓存池
  import './assets/images/favicon.ico'

  export default {}
</script>

<style scoped>

</style>