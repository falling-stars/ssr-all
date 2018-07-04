import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
import {createStore} from './store'
import {sync} from 'vuex-router-sync'
import axios from '../unitils/axios'
import {Message} from 'element-ui'

Vue.prototype.$axios = axios
Vue.prototype.$message = Message

export function createApp() {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {app, router, store}
}