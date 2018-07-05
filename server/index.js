// const https = require('https')
const {resolve} = require('path')
const fs = require('fs')
const Koa = require('koa')
const server = require('koa-static')
const mount = require('koa-mount')
const router = require('./router')
const proxy = require('koa-better-http-proxy')
const proxyConfig = require('../proxy-config')
const resolvePath = require('./resolve-path')
const SWProcess = require('./sw-process')
const OS = /:\\/.test(__dirname) ? 'win' : 'linux'
SWProcess()
// const ssh = {
//   key: fs.readFileSync(resolve(__dirname, '../ssh/ssh.key')),
//   cert: fs.readFileSync(resolve(__dirname, '../ssh/ssh.pem'))
// }
const app = new Koa()
// app.use(async (ctx, next) => {
//   if (ctx.host !== 'www.gracly.com') {
//     ctx.status = 404
//   } else {
//     await next()
//   }
// })
app.use(async (ctx, next) => {
  if (/\.img$/.test(ctx.url) || /\.img\?/.test(ctx.url)) {
    if (/webp=1/.test(ctx.header.cookie)) {
      ctx.url = ctx.url.replace(/\.img/, '.webp')
    } else {
      const targetUrl = resolvePath(ctx.url, OS)
      ctx.url = targetUrl ? targetUrl : ctx.url
    }
  }
  await next()
})
app.use(server(resolve(__dirname, '../dist-pc'), {index: 'default', maxage: 1000 * 60 * 60 * 24 * 30, immutable: true}))
app.use(server(resolve(__dirname, '../dist-m/pwa'), {index: 'default'}))
app.use(server(resolve(__dirname, '../dist-m'), {index: 'default', maxage: 1000 * 60 * 60 * 24 * 30, immutable: true}))
app.use(router.routes()).use(router.allowedMethods())
let reg = '^('
proxyConfig.forEach(i => reg += `${i.from}|`)
reg = reg.replace(/\|$/, ')')
app.use(async (ctx, next) => {
  if (!new RegExp(reg).test(ctx.url)) {
    ctx.body = '404页面'
  } else {
    await next()
  }
})
proxyConfig.forEach(i => {
  app.use(mount(i.from, proxy(i.to, {
    preserveReqSession: true
  })))
})

// https.createServer(ssh, app.callback()).listen(443, () => console.log('Web Run In https://localhost:443'))
app.listen(8080, () => console.log('Web Run In https://localhost:8080'))
// const redirect = new Koa()
// const redirectURL = 'https://www.gracly.com'
// redirect.use(async ctx => {
//   if (ctx.host !== 'www.gracly.com') {
//     ctx.status = 404
//   } else {
//     ctx.status = 301
//     ctx.set({'Location': redirectURL + ctx.url})
//   }
// })
// redirect.listen(80, () => console.log(`端口：80已重定向到：${redirectURL}`))