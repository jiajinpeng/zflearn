class Layer {
  constructor(p,cb){
    this.p = p;
    this.cb = cb;
  }
}
class Router{
  constructor(){
    this.layers = [];
  }
  get(path,callback){
    this.layers.push(new Layer(path, callback));
  }
  compose(ctx, next, routes){
    function dispatch(index) {
        if(index === routes.length) return next();
        let route =  routes[index];
        route(ctx,()=>dispatch(index+1));
    }
    dispatch(0);
  }
  routes(){
    return (ctx, next) => {
      let p = ctx.path;
      let routes = this.layers.filter(l=>l.p ===p).map(l=>l.cb);
      this.compose(ctx,next,routes);
    }
  }
}

module.exports = Router;