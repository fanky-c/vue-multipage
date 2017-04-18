// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
//var util = require('../lib/util');

module.exports = {
  trunk:{
     env: require('./trunk.env'),
     assetsRoot: path.join(__dirname, '../../../../trunk/vue-multipage/'),
     assetsSubDirectory: '',   //static     
  },
  build: {
    env: require('./prod.env'),
    assetsRoot: path.join(__dirname, '../../../commit/vue-multipage/mobile'), //output
    //assetsRoot: path.join(__dirname, '../output'), //output
    assetsSubDirectory: '',   //static
    assetsPublicPath: '//web.yystatic.com/project/group_act/vue-multipage/mobile',  //cdn https相对路径
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    assetsRoot:path.join(__dirname, '../dist'),
    port: 8081,
    //assetsSubDirectory: 'static',
    assetsSubDirectory: './src',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}

//cdn random
function getRandomCdn(url){
    var url = url;
    return url[Math.floor(Math.random() * url.length)];
}
