<template>
  <div>
    <h1>VueSSR</h1>
    <router-link to="/demo">SSR-DEMO</router-link>
    <div class="container"></div>
  </div>
</template>

<script>
  export default {
    asyncData({axios}) {
      axios('/api/web/api/area/hotArea/v1').then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    mounted() {
      this.$axios('/cpp/api/plugin/info?name=highlight').then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="scss">
  .container {
    @extend %demo;
  }
</style>