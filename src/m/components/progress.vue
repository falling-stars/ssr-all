<template>
  <div v-if="show" class="progress" :style="{width:`${loaded}%`}"></div>
</template>

<script>
  export default {
    data: () => ({
      loaded: 0,
      complete: false,
      show: false
    }),
    methods: {
      start() {
        const self = this
        self.loaded = 0
        self.complete = false
        self.show = true
        let num = 0
        const loading = () => {
          if (num > 70) {
            num += Math.random() * 10
          } else if (num > 80) {
            num += Math.random() * 5
          } else if (num > 90) {
            num += Math.random() * 0.5
          } else {
            num += Math.random() * 30
          }
          self.loaded = num
          setTimeout(() => {
            if (!this.complete) {
              loading()
            } else {
              self.loaded = 100
              setTimeout(() => {
                self.show = false
              }, 200)
            }
          }, 100)
        }
        loading()
      },
      end() {
        this.complete = true
      }
    }
  }
</script>

<style scoped>
  .progress {position: fixed;height: 2px;left: 0;top: 0;background-color: rgba(95, 184, 120, 0.9);box-shadow: 0 1px rgba(95, 184, 120, 0.2);transition: all 0.2s;z-index: 9999}
</style>