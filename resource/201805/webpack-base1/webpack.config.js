let path = require('path');
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    'index': './src/index.js',
  },// 入口
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          {loader: MiniCssExtractPlugin.loader},
          'css-loader']
      },
      { test: /\.less$/, use: [
        { 
          loader: MiniCssExtractPlugin.loader,
          options:{
            publicPath:'http://zf.cn' // 会将再css中引用的图片路径加前缀
          }
        },
         'css-loader', 
         'less-loader'] },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/my.css",
    }),
    new cleanWebpackPlugin(['./dist']),
    new webpack.HotModuleReplacementPlugin(),

    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    })
  ],
  resolve: {},
  mode: 'development'
}

// 下周一 继续webpack