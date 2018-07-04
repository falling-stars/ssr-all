<template>
  <div v-if="loginShow" class="login-cover fixed full-height full-width flex flex-center overflow-hide">
    <div class="login white-bg border-box relative text-center relative" :style="{transform:`rotate(${rotate}deg)`,top:`${top}%`}">
      <i @click="close " class="close pointer fa fa-times-circle red absolute" aria-hidden="true"></i>
      <h1 class="grey relative">gracly</h1>
      <div class="full-width full-height padding border-box">
        <div class="relative">
          <i class="login-i fa fa-user blue" aria-hidden="true"></i>
          <input class="block border-box" placeholder="请输入用户名" maxlength="15" type="text">
        </div>
        <div class="relative">
          <i class="login-i fa fa-lock blue" aria-hidden="true"></i>
          <input class="block border-box" placeholder="请输入密码" maxlength="15" type="password">
        </div>
        <a class="post block white font-18 pointer relative">登录</a>
        <i class="fa fa-weixin pointer" aria-hidden="true"></i>
        <i class="fa fa-weibo pointer margin-left margin-right" aria-hidden="true"></i>
        <i class="fa fa-github pointer" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loginShow: {
        type: [Boolean],
        default: false
      }
    },
    data: () => ({
      rotate: 90,
      top: 0
    }),
    methods: {
      close() {
        const self = this
        this.rotate = -77
        setTimeout(() => {
          self.top = 100
        }, 1000)
        setTimeout(() => {
          self.$emit('loginClose')
        }, 1600)
      }
    },
    watch: {
      loginShow(value) {
        if (value) {
          const self = this
          setTimeout(() => {
            self.rotate = 0
          }, 200)
        } else {
          this.rotate = 90
          this.top = 0
        }
      }
    }
  }
</script>

<style scoped>
  h1{font-family:WaltDisneyScript,sans-serif;font-size: 60px;line-height: 30px;user-select: none;top: -38px}
  .login-cover {background-color: rgba(255,255,255,0.8);z-index: 999}
  .login {width: 600px;height: 400px;border-radius:5px;border: solid 1px #ddd;box-shadow: 0 0 15px #c2c2c2;padding: 60px;transform-origin: 580px 15px;transition: all 1.2s}
  .login .close{border-radius:50%;font-size: 35px;right: 10px;top: 8px;opacity: 0.9}
  input{width: 60%;margin: auto;outline: none;margin-bottom:24px;border: none;border-bottom: solid 2px #e2e2e2;font-size: 16px;padding: 5px 10px 5px 28px;transition: all 0.5s}
  input:focus{border-bottom: solid 2px #5FB878}
  .fa-weixin{color:#5FB878}
  .fa-weibo{color:#c80f1e}
  .login i{font-size: 28px}
  .login-i{position: absolute;left: 94px;bottom: 8px;font-size: 18px!important;}
  .post{width: 254px;margin: auto;user-select:none;margin-top:40px;margin-bottom: 20px;padding: 10px 10px;background-color:#1E9FFF;border: none;border-radius: 50px}
  .post:after{pointer-events: none;position: absolute;left:0;top:0;content: "";box-sizing: border-box;display: block;width: 274px;height: 38px;border: solid 1px #1E9FFF;border-radius: 50px;transition: all 0.8s}
  .post:hover:after{left: -20px;width: 314px;top:-10px;height: 58px;opacity: 0}
</style>