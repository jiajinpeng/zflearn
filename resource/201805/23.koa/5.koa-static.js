let Koa = require('koa');
// let static = require('koa-static');
let app = new Koa();
let path = require('path');
let fs = require('fs');
let {promisify} = require('util');
let stat = promisify(fs.stat);
function static(root) {
  return async (ctx,next)=>{
    let realPath = path.join(root,ctx.path);
    try{
      let statObj = await stat(realPath);
      if(statObj.isDirectory()){
        let p = path.join(realPath,'index.html');
        await stat(p);
        ctx.body = fs.createReadStream(p);
      }else{
        ctx.body = fs.createReadStream(realPath);
      }
    }catch(e){
      return next();
    }
  }
}
app.use(static(path.join(__dirname,'public')));
app.use( (ctx,next) => {
    ctx.body = 'hello world'
})
app.listen(3000);