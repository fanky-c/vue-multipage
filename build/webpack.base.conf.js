var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../');
var webpack=require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  // 获取多入口, 注意这个路径， 至于为什么是 ./src仍然需要了解，我觉得应该是 ../src
  entry: utils.getEntries('./src/page/**/*.js'),
  output: {
    //path: config.build.assetsRoot,
    path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.txt', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'mockdata': path.resolve(__dirname, '.../src/mockdata'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  //不打包
  externals:{
    //$: 'jquery'
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html?removeOptionalTags=false'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: [
        'url?limit=2048&name='+utils.assetsPath('/images/[name].[hash:7].[ext]'),
        'image-webpack'
        ]
      }, 
      // { 
      //   test: require.resolve(__dirname, '../src/assets/js/yymobile/lib/yymobile_api_v1.2.12.js'), 
      //   loader: "exports?YYMobile" 
      // },           
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5120,
          name: utils.assetsPath('/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
