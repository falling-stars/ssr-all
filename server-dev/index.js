const device = process.env.NODE_ENV
const {resolve} = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount')
const proxy = require('koa-better-http-proxy')
const router = new Router()
const app = new Koa()
const {createBundleRenderer} = require('vue-server-renderer')

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    basedir: resolve(__dirname, `../dist-${device}`),
    runInNewContext: false
  }))
}

let renderer

const readyPromise = require('./setup-dev-server')(
  app,
  resolve(__dirname, `../src/${device}/template.html`),
  (bundle, options) => renderer = createRenderer(bundle, options)
)

function render(ctx) {
  return new Promise((resolve, reject) => {
    ctx.set('Content-Type', 'text/html')
    const handleError = err => {
      if (err === 404) {
        resolve(404)
      } else {
        console.log(err)
      }
    }

    const context = {
      url: ctx.url
    }
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      resolve(html)
    })
  })
}

router.get('*', async (ctx, next) => {
  ctx.type = 'html'
  await readyPromise
  const html = await render(ctx)
  if (html !== 404) {
    ctx.body = html
  } else {
    await next()
  }
})
app.use(router.routes()).use(router.allowedMethods())
app.use(async (ctx, next) => {
  console.log(ctx.url)
  if (!/^\/api.+/.test(ctx.url)) {
    ctx.body = 43
  } else {
    await next()
  }
})
app.use(mount('/api', proxy('https://m.9ji.com', {
  preserveReqSession: true
})))

app.listen(8080, () => console.log('Web Run In https://localhost:8080'))
