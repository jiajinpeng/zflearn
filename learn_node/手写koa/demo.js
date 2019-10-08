let Koa = require('./koa')
let app = new Koa()

app.use((ctx,next)=>{
    ctx.res.setHeader('Context-Type','text/html;charset=utf8')
    console.log(1)
    next()
    console.log(2)
})
app.use((ctx,next)=>{
    console.log(3)
    next()
    console.log(ctx.body = '你哈')
    console.log(4)
})
app.listen(3000)