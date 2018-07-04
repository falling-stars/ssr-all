<template>
  <div>
    <h1>VueSSR</h1>
    <router-link to="/demo">demo</router-link>
  </div>
</template>

<script>
  import axios from '../../unitils/axios'
  export default {
    asyncData() {
      axios('https://m.9ji.com/web/api/area/hotArea/v1').then(data => {
        console.log(data)
      }).catch(err => console.log(err))
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