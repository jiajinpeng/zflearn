let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router =new Router();
// 路由参数
router.get('/article/:id',(ctx,next)=>{
  console.log(ctx.params.id)
});
app.use(router.routes());
app.listen(3000);