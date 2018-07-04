import Vue from 'vue'
import progress from './components/progress'
import {createApp} from './main'

const processBar = Vue.prototype.$progress = new Vue(progress).$mount()
document.body.appendChild(processBar.$el)

const {app, router, store} = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    processBar.start()
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      processBar.end()
      next()
    }).catch(next)
  })
  app.$mount('#app')
})