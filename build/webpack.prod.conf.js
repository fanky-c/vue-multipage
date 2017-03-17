var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    
    //图片压缩
    new ImageminPlugin({  
      pngquant: {
        quality: '95-100'
      }
    }),

    //js混淆
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    
    //生成css文件
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    
    // 公共node_modules模块的提取
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor', // 生成文件的名字   
    //   minChunks: function (module, count) {
    //     var rs = (module.resource 
    //             && /\.js$/.test(module.resource) 
    //             && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
    //     return rs;
    //   }
    // }),
    
    // 公共模块提取
    new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor', // 生成文件的名字
          chunks: utils.getEntries('./src/page/**/*.js'),    //只有入口中都引用的模块才会被打包的到公共模块
          minChunks: utils.getEntries('./src/page/**/*.js').length
    }),
  
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

var pages = utils.getEntries('./src/page/**/*.html');
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: 'html/'+ page + '.html',
    title:'prod',
    template: pages[page], //模板路径
    inject: true,  //js自动被注入body元素的底部
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
