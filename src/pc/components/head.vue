<style scoped>
  header{height:50px;margin-top: 0;transition: margin-top 1s}
  header input{width:130px;height:22px}
  .home{height:28px;width:70px;font-family:WaltDisneyScript,sans-serif;font-size:0.53rem;line-height:0.38;padding-left:10px}
  nav{height:50px}
  li{width:80px;height:50px;line-height:47px;margin-left:26px}
  li:first-child{margin-left:0}
  .search{left:22px;pointer-events:none}
  input{text-indent:30px;border-radius:40px;border:none;padding:2px}
  .tag{z-index:99;top:46px;width:80px;height:4px;transition:all .4s}
  .extend{width: 0.5rem;height: 0.5rem;bottom: -0.25rem;left: calc(50% - 0.5rem);border-radius: 50%;border: solid 1px rgba(104, 104, 104, 0.5);line-height: 0.7rem}
</style>

<template>
  <header class="relative cursor-default black-bg flex flex-justify-between" :style="{marginTop:`${fold?-50:0}px`}">
    <div class="flex flex-center full-height">
      <router-link to="/" class="inline-block margin-left white home normal">gracly</router-link>
      <i class="fa fa-search white event-none relative search "></i>
      <input readonly value="搜索组件和库" type="text" class="grey-6-bg font-10 grey-e pointer">
    </div>
    <nav class="relative">
      <ul class="list-none padding-right">
        <li v-for="u in link" class="inline-block cursor-pointer text-center" @mouseover="over" @mouseout="out">
          <router-link :to=u.url class="font-18 full-width full-height font-16 inline-block white">{{u.name}}
          </router-link>
        </li>
      </ul>
      <span class="inline-block absolute tag select-color" :style="{left:tagX+'px'}"></span>
    </nav>

    <i v-if="fold" class="extend fa fa-angle-double-down inline-block absolute pointer text-center" aria-hidden="true" @click="extend"></i>
  </header>
</template>

<script>
  export default {
    data: () => ({
      fold: false,
      link: [
        {url: '/', name: '首页'},
        {url: '/start', name: '快速入门'},
        {url: '/document', name: '文档'},
        {url: '/hub', name: '社区'},
        {url: '/about', name: '关于'}
      ],
      initialX: 0,
      tagX: 0
    }),
    methods: {
      over: function (e) {
        this.tagX = e.target.offsetLeft
        e.target.classList.add('over')
      },
      out: function (e) {
        e.target.classList.remove('over')
        setTimeout(() => document.getElementsByClassName('over').length === 0 && (this.tagX = this.initialX), 400)
      },
      routeActiv(path) {
        this.fold = /\/hub.*/.test(path) ? 1 : 0
        this.fold && (path = '/hub')
        switch (path) {
          case '/':
            this.initialX = 0
            this.tagX = 0
            break
          case '/start':
            this.initialX = 106
            this.tagX = 106
            break
          case '/document':
            this.initialX = 212
            this.tagX = 212
            break
          case '/hub':
            this.initialX = 318
            this.tagX = 318
            break
          case '/about':
            this.initialX = 420
            this.tagX = 420
            break
        }
      },
      extend() {
        this.fold = false
      }
    },
    created() {
      this.routeActiv(this.$route.path)
    },
    watch: {
      $route(to) {
        this.routeActiv(to.path)
      }
    }
  }
</script>