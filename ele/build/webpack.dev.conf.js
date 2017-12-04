'use strict'
const utils = require('./utils')  // 工具类
const webpack = require('webpack')
const config = require('../config') // 环境配置文件
const merge = require('webpack-merge') // 合并配置文件
const baseWebpackConfig = require('./webpack.base.conf') // 基础配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// 热加载技术  这里其实是数组的拼接 他首先将webpack.base.conf所有需要entry的文件进行遍历
// 获取每个entry文件的路径 进行数组合并
// 该数组中entry的文件改变源码浏览器不用刷新也能看到效果,如果过程失败 自动刷新浏览器

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
