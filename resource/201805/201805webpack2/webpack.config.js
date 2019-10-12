const path = require('path');
const DonePlugin = require('./plugins/DonePlugin');
const OptimizePlugin = require('./plugins/OptimizePlugin');
const AsyncPlugin = require('./plugins/AsyncPlugin');
const FileListPlugin = require('./plugins/FileListPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlinePlugin = require('./plugins/InlinePlugin');
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                /// 收集所有的css样式
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            }
        ]
    },
    //引用外部库,在代码中引入jquery的时候并不会打包此jquery库
    /*  externals: {
         //key库的名字 值是全局变量名
         jquery: 'jQuery'
     }, */
    plugins: [
        //new DonePlugin(),
        //new OptimizePlugin(),
        //new AsyncPlugin(),
        //new FileListPlugin()
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        /*  new InlinePlugin({
             test: /\.(js|css)$/
         }) */
        new AutoExternalPlugin({
            jquery: {
                varName: 'jQuery',
                url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'
            }
        })
    ]
}