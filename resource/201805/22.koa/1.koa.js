let Koa = require('./koa/application');
let app = new Koa();
let log = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('log');
      resolve();
    }, 1000);
  })
}
// 当第一个中间件执行的时候(第一个函数就是一个promise) 
app.use( (ctx,next)=> {
  console.log(1);
  return next(); // 调用这个函数的时候 就是当前第二个函数不一定执行完了
  console.log(2);
});
app.use(async (ctx, next) => {
  console.log(3);
  await log()
  next();
  console.log(4);
})

app.listen(3000);



// app.use((ctx) => {
//   // console.log(ctx.req.url);
//   // console.log(ctx.request.req.url);
//   // console.log(ctx.request.url);
//   // // ctx.path代理了 ctx.request.path;
//   // console.log(ctx.url);
//   // console.log(ctx.query);

//   ctx.response.body = 'hello'; // ctx.response.body = '123'
//   console.log(ctx.body)
// });