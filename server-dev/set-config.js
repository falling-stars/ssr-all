const webpack = require('webpack')
const device = process.env.NODE_ENV
const vueRule = {
  test: /\.vue$/,
  loader: 'vue-loader'
}
const imageRule = {
  test: /\.(png|jpe?g|gif|eot|ttf|woff2?|svgz?)$/i,
  use: [{
    loader: 'url-loader',
    options: {
      name: `assets/images/[name]-${device}.[ext]`,
      limit: 5000
    }
  }]
}
const cssRule = {
  test: /\.css$/,
  loader: ['vue-style-loader', 'css-loader', 'postcss-loader']
}

module.exports = (clientConfig, serverConfig) => {
  clientConfig.mode = serverConfig.mode = 'development'
  clientConfig.entry.app = ['webpack-hot-middleware/client'].concat(clientConfig.entry.app)
  clientConfig.output.filename = serverConfig.output.filename = '[name].js'
  clientConfig.module.rules.splice(0, 4, vueRule, imageRule, cssRule)
  serverConfig.module.rules.splice(0, 4, vueRule, imageRule, cssRule)
  serverConfig.plugins.shift()
  clientConfig.plugins.shift()
  if (device === 'm') {
    clientConfig.plugins.pop()
    clientConfig.plugins.pop()
  }
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin({multiStep: true}),
    new webpack.NoEmitOnErrorsPlugin()
  )
}
