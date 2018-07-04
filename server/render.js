const fs = require('fs')
const {resolve} = require('path')
const LRU = require('lru-cache')
const noCache = require('./no-cache')
const {createBundleRenderer} = require('vue-server-renderer')
const serverBundlePC = require('../dist-pc/vue-ssr-server-bundle')
const clientManifestPC = require('../dist-pc/vue-ssr-client-manifest')
const templatePC = fs.readFileSync(resolve(__dirname, '../src/pc/template.html'), 'utf-8')
const serverBundleM = require('../dist-m/vue-ssr-server-bundle')
const clientManifestM = require('../dist-m/vue-ssr-client-manifest')
const templateM = fs.readFileSync(resolve(__dirname, '../src/m/template.html'), 'utf-8')
const isMobile = (userAgent) => /Android|iPhone|Mobile/i.test(userAgent)
const webCache = LRU({
  max: 200,
  maxAge: 1000 * 60 * 10
})
const rendererPC = createBundleRenderer(serverBundlePC, {
  runInNewContext: false,
  template: templatePC,
  clientManifest: clientManifestPC
})
const rendererM = createBundleRenderer(serverBundleM, {
  runInNewContext: false,
  template: templateM,
  clientManifest: clientManifestM
})
const render = ctx => new Promise((resolve, reject) => {
  const mobile = isMobile(ctx.request.header['user-agent']) ? 1 : 0
  const renderer = mobile ? rendererM : rendererPC
  const url = ctx.url
  const key = mobile ? url + '-m' : url + '-pc'
  // 缓存管理
  if (noCache.has(key)) {
    renderer.renderToString(ctx, (error, html) => {
      error ? reject(error) : resolve(html)
    })
  } else {
    if (!webCache.has(key)) {
      renderer.renderToString(ctx, (error, html) => {
        if (error) {
          reject(error)
        } else {
          webCache.set(key, html)
          resolve(html)
        }
      })
    } else {
      resolve(webCache.get(key))
    }
  }
})

module.exports = render