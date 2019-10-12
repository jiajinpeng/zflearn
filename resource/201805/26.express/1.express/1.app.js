// express 里面内置了路由 用法和koa类似
// 内部实现es6 
// express中只是对req和res进行了添加属性和方法，并没有把req,res封装
let express = require('./express');
// app 其实就是我们的监听函数
let app = express(); // express是一个函数
// 每次调用路由的时候 都会存一下路径和方法
// 请求到来时 在这个里面查找路径匹配的执行对应的函数
app.get('/',function (req,res) {
  console.log(req.url); // 请求的路径
  console.log(req.method); // 请求的方法
  console.log(req.headers); // 请求头
  console.log(req.path); // 请求的路径 不包含?
  console.log(req.query); // 问号后面的内容 /a?a=1  {a:1}
  console.log(req.hostname); // 获取请求的主机
  res.end('hello');
});
app.get('/user', function (req, res) {
  res.end('get /user');
});
app.post('/user',function (req,res) {
  res.end('/post user');
})
app.listen(3000,function () {
  console.log(`server start 3000`);
}); // 监听端口号