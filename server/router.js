const fs = require('fs')
const Router = require('koa-router')
const render = require('./render')
const router = new Router()

router.get('*', async (ctx, next) => {
  ctx.type = 'html'
  const html = await render(ctx).catch(error => error !== 404 && console.log(error))
  if (html) {
    ctx.body = html
  } else {
    await next()
  }
})
module.exports = router