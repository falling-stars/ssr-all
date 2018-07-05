const resolve = path => require('path').resolve(__dirname, path)
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const device = process.env.NODE_ENV
module.exports = {
  mode: 'production',
  output: {
    path: resolve(`../dist-${device}`),
    filename: `[name].[chunkhash]-${device}.js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.(gif|eot|ttf|woff2?|svgz?)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: `assets/images/[name].[hash]-${device}.[ext]`,
            limit: 5000
          }
        }]
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'image-webp-loader',
            options: {
              outputPath: resolve(`../dist-${device}`),
              name: `assets/images/[name].[hash]-${device}.[ext]`,
              subQuality: {
                'user.jpeg': 85,
                'index-back.jpg': 85
              },
              requestType: 'img'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/},
      {
        test: /\.scss$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [resolve(`../src/${device}/assets/style/common.scss`)]
            }
          }
        ]
      },
      {test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader']},
      {
        test: /favicon\.ico$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
      allChunks: true
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.css', '.vue'],
    alias: {
      '~': resolve(`../src/${device}`)
    }
  }
}
