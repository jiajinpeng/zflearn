// 把webpack-dev-server的配置引入到我自己的服务
// 启动我自己的服务 实现配置
let express = require('express');
// 帮我们把dev-server加到我的服务里面来
let webpackDevMiddleware = require('webpack-dev-middleware');
// 引入webpack配置文件
let config = require('./webpack.config');
let app = express();
let webpack = require('webpack');
let compiler = webpack(config); // 用webpack进行编译
app.use(webpackDevMiddleware(compiler)); // 中间件的用法 就是编译
app.get('/api/user',function (req,res,next) {
  res.send({name:'zfpx'});
})
app.get('/user', function (req, res, next) {
  res.send({ name: 'jw' });
})

app.listen(3000);