let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream = require('stream');
let EventEmitter = require('events');
class Koa extends EventEmitter{
  constructor(){
    super();
    this.middlewares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn){
    this.middlewares.push(fn);
  }
  createContext(req,res){
    // 上下文就是一个对象而已
    let ctx = this.context;
    // ctx上拥有两个自定义的属性 request response
    ctx.request = this.request;
    ctx.response = this.response;
    // req和res是自己身上的
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  compose(ctx,middlewares){
    function dispatch(index) {
      if(index === middlewares.length) return Promise.resolve();
      let fn = middlewares[index];
      return Promise.resolve(fn(ctx,()=>dispatch(index+1)));
      }
    return dispatch(0);
  }
  handleRequest(req,res){
    let ctx = this.createContext(req,res);
    let p = this.compose(ctx,this.middlewares); // 把函数组合起来
    p.then(() => {
      let body = ctx.body;// 当所有的函数都执行完后取出body的值，响应回去即可
      console.log(body instanceof Stream);
      if (body instanceof Stream){
        body.pipe(res);
      }else if(Buffer.isBuffer(body) || typeof body === 'string'){
        res.end(body);
      }else if(typeof body === 'object' ){
        res.end(JSON.stringify(body));
      }else{
        res.end(body);
      }
    }).catch(err => {
      this.emit('error', err);
    });
  }
  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}
module.exports = Koa;