let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    mode:'development',
    entry:"./src/index.js",
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    devServer:{
        port:3000,
        progress:true,
        open:true,
        contentBase:"./dist"
    },
    optimization:{
        minimizer:[
            // new UglifyJsWebpackPlugin({
            //     cache:true,
            //     sourceMap:true,
            //     parallel:true
            // }),
            // new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                // collapseWhitespace:true
            },
            hash:true
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    // {
                    //     loader:'style-loader'
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}