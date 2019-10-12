let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
module.exports = {
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
            limit: 8 * 1024
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
        include: path.resolve(__dirname, 'src/ts'),
        exclude: /node_modules/ 
      },
      {
        test:/\.js$/,
        use:'babel-loader',
        exclude: /node_modules/ 
      }
    ]
  },
  resolve:{ // 引入js可以省略后缀
    extensions:['.js','.css','.vue'],
    // alias:{ // 别名
    //   bootstrap:'bootstrap/dist/css/bootstrap.css'
    // }
    mainFields:['style','main'],
    // 限制第三方查找的路径
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve('moudle')],
    mainFiles:['index.js','a.js']
  },
  devServer: {
    "port": 3333,
    // before(app){ // 模拟数据的方式
    //   app.get('/api/user',function (req,res,next) {
    //       res.json({username:'zfpx',age:9});
    //   })
    // }
    // proxy:{
    //   '/api':{  // /api/user
    //     target: 'http://localhost:3000',
    //     pathRewrite:{
    //       '/api':''
    //     }
    //   }
    // }
  },
  externals:{
    'jquery':'$' // window.$ = jquery
  },
  plugins: [
    // 提供全局的插件 不需要再次引入了
    // new webpack.ProvidePlugin({
    //   '$':'jquery'
    // }),
    new MiniCssExtractPlugin({
      filename: 'my.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}





// 1)
// {
//   loader: 'style-loader',
//     options: {
//     insertAt: 'top'
//   }
// }