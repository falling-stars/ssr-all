<template>
  <div>
    <h1>VueSSR</h1>
    <router-link to="/demo">demo</router-link>
  </div>
</template>

<script>
  export default {
    asyncData() {
      console.log(this.$axios)
      // this.$axios('/api/web/api/area/hotArea/v1').then(data => {
      //   console.log(data)
      // }).catch(err => {
      //   this.$message({
      //     message: err,
      //     type: 'error',
      //     center: true
      //   })
      // })
    }
  }
</script>

<style>

</style>