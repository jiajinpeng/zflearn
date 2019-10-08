let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
class Koa {
    constructor(){
        this.middlewares = [];
        this.context = context
        this.request = request
        this.response = response
    }
    use(fn){
        this.middlewares.push(fn)
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
    handleRequest(req,res){
        let ctx = this.createContext(req,res)
        this.compose(ctx,this.middlewares)
        res.end(ctx.body)
    }
    createContext(req,res){
        let ctx = this.context
        ctx.request = this.request
        ctx.response = this.response

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    compose(ctx,middlewares){
        function dispatch(index){
            if(index === middlewares.length ) return
            let fn = middlewares[index]
            fn(ctx,()=>dispatch(index+1))
        }
        dispatch(0)
    }
}

module.exports = Koa