let Koa = require('koa');

// app就是监听函数 use 实现的中间件方法
// listen 监听端口号
// on('error')监听错误
let app = new Koa();

// ctx 是基于req 和 res  原生的
// 并且扩展了两个属性(request,response) 扩展的
let fs = require('fs');
app.use((ctx,next)=>{
  console.log(ctx.request.req.path);
  console.log(ctx.response.req.path);
  console.log(ctx.req.path);
  console.log(ctx.request.path);
  console.log(ctx.path);
  // ctx.body新增了返回 对象 文件流 字符串 
  ctx.body = 'hello'; // 并不是马上调用res.end方法
  next();
});
app.use((ctx,next)=>{
  ctx.body = 'world'
}); // [fn1,fn2,fn3]
app.listen(4000);

// koa源码 3行 compose
