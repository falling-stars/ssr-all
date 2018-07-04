<style scoped>
    footer {height: 135px;cursor: default;user-select: none;padding-top: 15px}
    .show>div{flex-grow: 1}
    .logo{font-family:WaltDisneyScript,sans-serif;font-size:0.53rem;line-height:0.38;padding-left: 16px}
    .logo+p{padding-left: 16px;margin-top: 22px}
    .link{padding-left: 86px}
    .link a{width: calc(50% - 5px)}
    .link a:hover{color: white}
</style>
<template>
  <footer class="black-bg cursor-default white padding-top">
    <div class="flex flex-justify-around show padding-bottom">
      <div class="white">
        <p class="logo">gracly</p>
        <p>PWA渐进式框架，构建高性能Web应用</p>
      </div>
      <div>
        友情链接：
        <div class="link">
          <a class="inline-block grey-9 font-14 margin-top" v-for="i in friendLink" :href=i.href target="view_window">{{i.name}}</a>
        </div>
      </div>
      <div>
        联系我们:
        <div class="link">
          <a class="inline-block grey-9 font-14 margin-top" v-for="i in connection" :href=i.href target="view_window">{{i.name}}</a>
        </div>
      </div>
    </div>
    <div class="border-top white text-center padding-top font-14">© 2018&nbsp;&nbsp;<router-link to="/" class="white" style="vertical-align: 1px">
      gracly.com
    </router-link>&nbsp;&nbsp;MIT
    </div>
  </footer>
</template>

<script>
  export default {
    data: () => {
      return {
        friendLink: [
          {href: 'http://www.alloyteam.com', name: 'AlloyTeam'},
          {href: 'http://taobaofed.org', name: '淘宝 FED'},
          {href: 'http://fex.baidu.com', name: '百度 FEX'},
          {href: 'http://babeljs.io', name: 'Babel'},
          {href: 'http://webpack.github.io', name: 'Webpack'}
        ],
        connection: [
          {href: 'mailto:liujianhuajs@gmail.com', name: '电子邮箱'},
          {href: 'https://github.com/grajs/gracly', name: 'GitHub'}
        ]
      }
    }
  }
</script>