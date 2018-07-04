<template>
  <div>
    <img src="../assets/images/vue.png"/>
    <h1>VueSSR</h1>
    <router-link to="/demo">demo</router-link>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$axios('/api/dsad', {name: 97}, 'post', true).catch(err => {
        this.$message({
          message: err,
          type: 'error',
          center: true
        })
      })
    }
  }
</script>

<style>

</style>