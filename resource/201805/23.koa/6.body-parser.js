let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
app.use(async (ctx, next) => {
  if (ctx.path === '/' && ctx.method === 'GET') {
    ctx.set('Content-Type', 'text/html;charset=utf8');
    ctx.body = fs.createReadStream(path.join(__dirname, '1.html'));
  } else {
    await next();
  }
});
function bodyParser(ctx) {
  return new Promise((resolve, reject) => {
    let arr = [];
    ctx.req.on('data', function (data) {
      arr.push(data);
    });
    ctx.req.on('end', function () {
      resolve(Buffer.concat(arr));
    })
  })
}
app.use(async (ctx, next) => {
  if (ctx.path === '/login' && ctx.method === 'POST') {
    console.log('提交来了');
    // a=b
    ctx.set('Content-Type', 'text/plain;charset=utf8');
    ctx.body = await bodyParser(ctx);
  }
})
app.listen(3000);
// koa上传文件 cookie session 进程 express 中间件