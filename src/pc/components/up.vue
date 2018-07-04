<template>
  <div class="container fixed">
    <div class="up full-width pointer text-center white-bg" @click="toUp">
      <i class="fa fa-rocket font-30" aria-hidden="true" :style="{color:upColor}"></i>
    </div>
    <div class="menu full-width pointer text-center white-bg relative" @click="spread" :style="{top:`${rotate === 0?0:0.7}rem`}">
      <i class="spread fa fa-life-ring font-30" aria-hidden="true" :style="{color:spreadColor,transform:`rotate(${rotate}deg)`}"></i>
      <ul v-show="ulShow">
        <li v-for="i in menu" class="white-bg absolute overflow-hide" :style="{right:`${i.right}rem`,top:`${i.top}rem`}">
          <router-link :to="i.url" class="font-12 full-height full-width inline-block relative">{{i.text}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      upColor: '#9c9c9c',
      spreadColor: '#9c9c9c',
      rotate: 0,
      ulShow: false,
      menu: [
        {text: '首页', url: '/', right: 0.03, top: 0.03},
        {text: '入门', url: '/start', right: 0.03, top: 0.03},
        {text: '社区', url: '/hub', right: 0.03, top: 0.03},
        {text: '关于', url: '/about', right: 0.03, top: 0.03}
      ]
    }),
    methods: {
      toUp() {
        const self = this
        self.upColor = '#5FB878'
        let top = document.documentElement.scrollTop
        const scroll = () => {
          top -= 50
          window.scrollTo(0, top)
          if (top > 0) {
            setTimeout(scroll, 4)
          } else {
            setTimeout(() => self.upColor = '#9c9c9c', 300)
          }
        }
        scroll()
      },
      spread() {
        const self = this
        if (self.rotate === 0) {
          self.spreadColor = '#5FB878'
          self.rotate = 90
          self.ulShow = true
          setTimeout(() => {
            self.ulShow = true
            self.menu[0].right = 0.1
            self.menu[0].top = -0.7
            self.menu[1].right = 0.7
            self.menu[1].top = -0.35
            self.menu[2].right = 0.7
            self.menu[2].top = 0.35
            self.menu[3].right = 0.1
            self.menu[3].top = 0.74
          }, 200)
        } else {
          self.rotate = 0
          setTimeout(() => self.spreadColor = '#9c9c9c', 500)
          setTimeout(() => self.ulShow = false, 500)
          for (let i = 0; i < 4; i++) {
            self.menu[i].right = 0.03
            self.menu[i].top = 0.03
          }
        }
      }
    }
  }
</script>

<style scoped>
  .container{width:.6rem;height:1.3rem;right:5px;bottom:40%}
  .up{border-radius:50%;border:solid 1px #dfdfdf;height:.6rem;margin-bottom:0.1rem}
  i{line-height:.65rem;font-size:.4rem;transform:rotate(-45deg)}
  .spread{line-height:.6rem;transition:all 0.5s}
  .menu{border-radius:50%;border:solid 1px #dfdfdf;height:0.6rem;transition:all 0.5s}
  .menu li{line-height:0.49rem;border-radius:50%;border:solid 1px #dfdfdf;width:0.5rem;height:0.5rem;transition:all 0.5s;z-index:-1}
  .menu li a{top: -2px}
  .menu li a:hover{background-color: #5FB878;color: white}
</style>