import Vuex from 'vuex'
import Vue from 'vue'
import store from './store'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store(store)
}