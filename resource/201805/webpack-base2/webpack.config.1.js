let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  // webpack 4 5
  optimization: {
    minimizer: [ // 压缩js UglifyJS-webpack-Plugin
      // mini-css-assets-webpack-plugin
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.css$/,
         use: [
           MiniCssExtractPlugin.loader, 
           'css-loader', 
           'postcss-loader'
           ]},
      {
        test: /\.png|.jpg /, use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024 // 在内部调用file-loader 把图片打包出来
          }
        }
      },
      {
        test: /\.html/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src/ts'), // 希望找哪个文件夹
        exclude: /node_modules/ // 希望不赵哪个文件夹
      },
      {
        test:/\.js$/,
        use:'babel-loader'
      }
    ]
  },
  devServer: {
    "port": 3333
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'my.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
//2) 图片引用方式
// 1) js 2) background 3) 在html中引入




// 1)
// {
//   loader: 'style-loader',
//     options: {
//     insertAt: 'top'
//   }
// }