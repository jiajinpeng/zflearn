let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
app.keys = ['zfpx']; // 盐值
// efTVI4r7ZDYhbmNGVVLvHmbxTwg
// sha1算法
let crypto  = require('crypto');
let c = crypto.createHmac('sha1','zfpx').update('name=hello').digest('base64');
console.log(c);
router.get('/read',(ctx,next)=>{
  let val = ctx.cookies.get('name',{signed:true});
  ctx.body = val || 'welcome'
})
router.get('/write', (ctx, next) => {
  ctx.cookies.set('name','zfpx',{signed:true,httpOnly:false});
  ctx.cookies.set('age','9');
  ctx.body = 'write ok';
})

app.use(router.routes());
app.listen(4000);