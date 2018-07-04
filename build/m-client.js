const {resolve} = require('path')
const merge = require('webpack-merge')
const base = require('./base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const OfflinePlugin = require('offline-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(base, {
  entry: {
    app: ['babel-polyfill', resolve(__dirname, '../src/m/entry-client.js')]
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
    new VueSSRClientPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../src/m/assets/pwa'),
        to: resolve(__dirname, '../dist-m/pwa')
      },
      {
        from: resolve(__dirname, '../src/m/assets/images/favicon.ico'),
        to: resolve(__dirname, '../dist-m/assets/images/favicon.ico')
      }
    ]),
    new OfflinePlugin({
      externals: ['/', '/demo'],
      excludes: ['manifest.json']
    })
  ]
})
