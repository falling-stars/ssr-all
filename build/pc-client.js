const {resolve} = require('path')
const merge = require('webpack-merge')
const base = require('./base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(base, {
  entry: {
    app: ['babel-polyfill', resolve(__dirname, '../src/pc/entry-client.js')]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        manifest: {
          test: /[\\/]node_modules[\\/]/,
          name: 'manifest',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
})
