let express = require('./express');
let app = express();
// 中间件 koa使用中间件 提前处理逻辑，中间件的位置一般在最上面
// express 中间件要写在路由的上面，可以在中间件中封装一些常用的方法
// 可以做权限校验 next 
// 路径重要开头匹配上就可以
// 老板发工资
app.use(function (req,res,next) {
  console.log('middle1');
  next('哈哈出错了');
});
app.use(function (req, res, next) {
  console.log('middle2');
  next();
});
app.get('/user/a',function (req,res) {
  res.send('user');
});
app.use(function (err,req, res,next) {
  console.log(err);
  res.end('xxx');
})

app.listen(3000);