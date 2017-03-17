require('shelljs/global')
env.NODE_ENV = 'trunk';

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('copy file for trunk...')
spinner.start()

var targerAssetsPath = path.join(config.trunk.assetsRoot, config.trunk.assetsSubDirectory);
var sourceAssetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm('-rf', targerAssetsPath);  //删除
mkdir('-p', targerAssetsPath); //创建
cp('-R', sourceAssetsPath, targerAssetsPath); //复制
spinner.stop()