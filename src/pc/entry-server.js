import {createApp} from './main'
import axios from '../unitils/axios/fetch'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      !matchedComponents.length > 0 && reject(404)
      let asyncTask = []
      const searchSyncData = target => {
        if (target.asyncData) {
          asyncTask.push(target.asyncData({store, route: router.currentRoute, axios}))
        }
        if (target.components) {
          let components = target.components
          for (let i in components) {
            searchSyncData(components[i])
          }
        }
      }
      matchedComponents.forEach(i => searchSyncData(i))
      Promise.all(asyncTask).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
