import fetch from './fetch'
import Vue from 'vue'

export default {
  install() {
    Vue.$axios = fetch
    Vue.prototype.$axios = fetch
  }
}