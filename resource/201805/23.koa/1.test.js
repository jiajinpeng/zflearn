let Koa = require('./koa/application');
let app = new Koa();
let logger = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
}
// return或者await 都可以达到同样的效果
let fs = require('fs');
app.use((ctx, next) => {
  ctx.body = fs.createReadStream('./1.txt');
  // console.log(1);
  // //throw new Error('出错了');
  // return next(); // 这个函数是异步函数
  // console.log(2);
});
app.use(async (ctx, next) => {
  console.log(3);
  await logger();
  next();
  console.log(4);
});
app.use(async (ctx, next) => {
  console.log(5);
  await next();
  console.log(6);
});
app.on('error', err => {
  console.log(err);
})
app.listen(3000);