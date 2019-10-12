// webpack 是用node方式来写 他采用的书写方式是 common规范
let path = require('path');
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // 入口 默认单入口 如果是多入口数组形式的话 会打包到一起['./src/index.js','./src/b.js']
  entry: {
    'index': './src/index.js',
    'b': './src/b.js'
  },// 入口
    output:{
      filename:'[name].[hash:8].js',
      // 出口路径是一个绝对的路径
      path: path.resolve(__dirname,'dist')
    }, // 出口
    devServer:{
      contentBase:'./dist', // 启动静态服务的目录
      port:3000,
      hot:true // 热更新
    }, // 开发服务的配置
    module:{}, // 模块的配置
    plugins:[
      // 清空文件夹插件
      new cleanWebpackPlugin(['./dist']),
      new webpack.HotModuleReplacementPlugin(),
      // 想写一个login页面 这个login引入b.js
      new htmlWebpackPlugin({
        template: './src/index.html',
        filename: 'login.html',
        chunks:['b','index']
      }),
      new htmlWebpackPlugin({
          template:'./src/index.html',
          filename:'index.html',
          chunks:['index']
          // hash:true
          // minify:{
          //   collapseWhitespace:true,
          //   removeAttributeQuotes:true
          // }
      })
    ], // 插件
    resolve:{}, // 如何解析 别名 模块的查找路径
    mode:'development' // 模式
}
// 1.自动打开一个开发服务
// webpack-dev-server