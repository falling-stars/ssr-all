<template>
  <div class="head flex flex-justify-between white-bg">
    <h1 class="logo flex-child-noshrink flex-child-noshrink inline-block padding-left margin-left black"><span class="orange">g</span><span class="orange-yellow margin-right-1">r</span><span class="yellow margin-right-1">a</span><span class="light-green">c</span><span class="blue">l</span><span class="light-purple">y</span></h1>
    <ul class="flex-child-grow padding-left">
      <li  class="inline-block full-height text-center margin-right border-box" v-for="(i, k) in list" :class="{select:selectNum === k}">
        <router-link class="inline-block full-height full-width" :to="i.url">{{i.text}}</router-link>
      </li>
    </ul>
    <div class="user flex-child-noshrink flex flex-align-center margin-right">
      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
    </div>
    <div class="login full-height flex flex-align-center flex-justify-between flex-child-noshrink padding-right margin-left">
      <button @click="show">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      list: [
        {text: '首页', url: '/hub'},
        {text: '问答', url: '/hub/commit'},
        {text: '分享', url: '/'},
        {text: '专栏', url: '/'}
      ],
      selectNum: 0
    }),
    methods: {
      show() {
        this.$emit('loginShow')
      }
    }
  }
</script>

<style scoped>
  .margin-right-1{margin-right: 1px}
  h1{letter-spacing: 1px;margin-right: 15px}
  .head{height: 46px;border-bottom: solid 1px #dfdfdf;user-select: none}
  .logo{font-family:WaltDisneyScript,sans-serif;cursor: default;font-size: 38px;line-height: 30px}
  .login{flex-basis: 1rem}
  .login *{cursor: pointer}
  .login button{border:none;padding: 7px 15px;border-radius: 15px;font-size: 14px;background-color:#9c9c9c;color:white}
  .user i{font-size: 30px}
  ul li{line-height: 46px;width: 80px}
  .select{border-bottom:solid 3px #1E9FFF}
</style>