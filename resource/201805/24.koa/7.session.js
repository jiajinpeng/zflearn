let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
let session = require('koa-session');
app.keys = ['zfpx'];
app.use(session({},app));
router.get('/visit',(ctx,next)=>{
  if(ctx.session.visit){
    ctx.session.visit+=1
    ctx.body = `第${ctx.session.visit}次访问`
  }else{
    ctx.session.visit = 1;
    ctx.body = `第一次访问`
  }
})

app.use(router.routes());
app.listen(4000);