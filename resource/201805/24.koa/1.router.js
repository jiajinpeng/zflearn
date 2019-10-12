let Koa = require('koa');
let app = new Koa();

let Router = require('./koa-router');
let router = new Router();
// 默认 通过.方法名(path,匹配执行对应的回调)
router.get('/',(ctx,next)=>{
  console.log(1);
  ctx.body = 'world'
  //next();
});
router.get('/a', (ctx, next) => {
  ctx.body = 'hello';
 // next();
});
// 挂载路由
app.use(router.routes());
app.use((ctx,next)=>{
  ctx.body = 'welcome'
})
app.listen(3000);