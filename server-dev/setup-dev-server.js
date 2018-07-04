const device = process.env.NODE_ENV
const {readFileSync} = require('fs')
const {join} = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const {koaDevMiddleware, koaHotMiddleware} = require('koa-webpack-middleware-zm')
const clientConfig = require(`../build/${device}-client`)
const serverConfig = require(`../build/${device}-server`)
const setConfig = require('./set-config')

const readFile = (fs, file) => fs.readFileSync(join(clientConfig.output.path, file), 'utf-8')

module.exports = function setupDevServer(app, templatePath, createRender) {
  let bundle = null
  let clientManifest = null
  let template = readFileSync(templatePath, 'utf-8')

  let ready = null

  const update = () => {
    if (bundle && clientManifest) {
      ready()
      createRender(bundle, {template, clientManifest})
    }
  }

  chokidar.watch(templatePath).on('change', () => {
    template = readFileSync(templatePath, 'utf-8')
    update()
  })

  setConfig(clientConfig, serverConfig)

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return false
    clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'))
    update()
  })

  app.use(koaDevMiddleware(devMiddleware))
  app.use(koaHotMiddleware(require('webpack-hot-middleware')(clientCompiler,
    {heartbeat: 5000}
  )))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return false
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return new Promise(resolve => {
    ready = resolve
  })
}
