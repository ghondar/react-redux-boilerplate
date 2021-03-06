const webpack       = require('webpack'),
  path              = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  UglifyJSPlugin    = require('uglifyjs-webpack-plugin'),
  LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  mode   : 'production',
  // Don't attempt to continue if there are any errors.
  bail   : true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  entry  : [ 'babel-polyfill', './src/App.jsx' ],
  output : {
    // filename: 'bundle.js',
    filename     : 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    path         : path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test   : /\.jsx?$/,
        loader : 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.styl/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader : 'css-loader',
              options: {
                modules       : true,
                importLoaders : 1,
                localIdentName: '__[hash:base64:10]'
              }
            },
            'stylus-loader'
          ]
        })
      }, {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader : 'postcss-loader',
              options: {
                modules       : true,
                importLoaders : 1,
                localIdentName: '__[hash:base64:10]'
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: [ '.js', '.json', '.jsx' ]
  },
  optimization: {
    minimize : true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ecma           : 5,
          keep_classnames: false,
          keep_fnames    : false,
          ie8            : false,
          nameCache      : null, // or specify a name cache object
          safari10       : false,
          toplevel       : false,
          warnings       : false,
          compress       : {
            unsafe_comps : true,
            properties   : true,
            keep_fargs   : false,
            pure_getters : true,
            collapse_vars: true,
            warnings     : false,
            sequences    : true,
            dead_code    : true,
            drop_debugger: true,
            comparisons  : true,
            conditionals : true,
            evaluate     : true,
            booleans     : true,
            loops        : true,
            unused       : true,
            hoist_funs   : true,
            if_return    : true,
            join_vars    : true,
            drop_console : true
          }
        }
      })
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject  : true,
      template: 'public/index.html',
      favicon : 'public/favicon.ico',
      minify  : {
        removeComments               : true,
        collapseWhitespace           : true,
        removeRedundantAttributes    : true,
        useShortDoctype              : true,
        removeEmptyAttributes        : true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash             : true,
        minifyJS                     : true,
        minifyCSS                    : true,
        minifyURLs                   : true
      }
    }),
    new webpack.DefinePlugin({
      __CLIENT__     : true,
      __SERVER__     : false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__   : false,
      __DEV__        : false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')   // Useful to reduce the size of client-side libraries, e.g. react
      }
    }),
    new ExtractTextPlugin({
      filename : 'static/css/[name].[contenthash:8].css',
      disable  : false,
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new LodashModuleReplacementPlugin()
  ]
}
