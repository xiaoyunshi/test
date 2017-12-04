1.package.json
npm run dev  => package.json scripts 封装了简单的node 命令
指定 "dev": "node build/dev-server.js",
2.dev-server.js
const opn = require('opn')    // 自动打开浏览器的模块
const path = require('path')  //提供文件路径的操作方法
const express = require('express') // 封装的node.js后台框架
const webpack = require('webpack') // 核心编译工具
const proxyMiddleware = require('http-proxy-middleware') // http协议代理中间键
const webpackConfig = require('./webpack.dev.conf')  开发环境下webpack配置文件

3.在webpack项目工程中 使用css预编译语言
step1.在vue文件<style lang='less/scss/stylus'>
这时cmd编译报错提示我们当前项目工程没有该预编译语言的loader
step2.cmd在当前工程目录下 输入 $ npm install --save-dev stylus-loader   (sass-loader|less-loader)
以stylus-loader为例 这时编译器仍然报错cannot find module 'stylus'
step3.cmd继续在当前目录下 输入 $ npm install --save-dev stylus
这样我们 工程项目就可使用预编译语言了


