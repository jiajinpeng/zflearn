let Koa = require('koa');

let app = new Koa();
let fs = require('fs');
let path = require('path');
let Router = require('koa-router');
let bodyParser = require('koa-bodyParser');
let router = new Router();
// 中间件写到上面 
app.use(bodyParser());
router.get('/', (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf8');
  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'));
});
router.post('/submit',(ctx,next)=>{
  // 用了bodyparser 后 他会看这个请求头类型是否支持，不支持不会做任何操作
  ctx.body = ctx.request.body
});

app
  .use(router.routes())
  .use(router.allowedMethods()); // 会有405 提示

app.listen(3000);