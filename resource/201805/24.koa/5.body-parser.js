let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
let Router = require('koa-router');
let convert = require('koa-convert');
let bodyParser = require('./koa-better-body');
let router = new Router();
// 指定上传的目录
app.use(bodyParser({
  uploadDir:path.resolve(__dirname,'upload')
}));
router.get('/', (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf8');
  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'));
});
router.post('/submit',(ctx,next)=>{
  // 用了bodyparser 后 他会看这个请求头类型是否支持，不支持不会做任何操作
  ctx.body = ctx.request.fields
});

app
  .use(router.routes())
  .use(router.allowedMethods()); // 会有405 提示

app.listen(3000);
// promise
// eventLoop
// fs
// http /tcp
// koa