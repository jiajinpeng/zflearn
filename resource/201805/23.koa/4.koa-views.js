// koa-views 第三方模块 专门实现 模板引擎的
let Koa = require('koa');
// let views = require('koa-views')
let app = new Koa();
let path = require('path');
function views(dir,{extension}) {
  return async (ctx,next)=>{
    // ctx.render是一个promise方法
    ctx.render = async function (p,obj) {
      let realPath = path.join(dir, p) + '.'+ extension;
      let fs = require('fs');
      let util = require('util');
      let readFile = util.promisify(fs.readFile);
      let str = await readFile(realPath,'utf8');
      ctx.body = require(extension).render(str, obj)
    }
    await next();
  }
}

app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}));
app.use(async (ctx,next)=>{
  // render方法返回的是一个promise 如果不写await
  await ctx.render('index',{name:'zfpx'});
});

app.listen(3000);