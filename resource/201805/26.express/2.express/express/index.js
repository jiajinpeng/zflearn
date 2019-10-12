let http = require('http');
let methods = require('methods');
let url = require('url');

function createApplication() {
  // 监听函数,请求到来时执行
  function app(req, res) {
    let method = req.method.toLowerCase();
    // req.url = /a?a=1
    let { pathname, query } = url.parse(req.url,true);
    // express 干的最常见的事 就是扩展原生req和res
    req.path = pathname;
    req.query = query;
    req.hostname = req.headers.host.split(':')[0];
    for(let i = 0;i<app.routes.length;i++){
      let layer = app.routes[i];
      if(layer.params){ // 路径参数 需要生成params
        if (layer.method === method && (layer.reg.test(req.path))){
          let matchers = req.path.match(layer.reg); // ['匹配到字符','1','2']
          req.params = layer.params.reduce((memo, current, index) => (memo[current] = matchers[index+1],memo),{});
          return layer.handler(req,res);
        }
      }
      if ((layer.pathname === req.path || layer.pathname === '*') && (layer.method === method || layer.method === 'all') ){
        return layer.handler(req,res);
      }
    }
    res.end(`Cannot ${pathname} ${method}`);
  }
  app.routes = []; // 存放路由的
  // 批量生产各种方法
  methods.forEach(method => {
    app[method] = function (pathname, handler) {
      let layer = {
        method,
        pathname,
        handler
      }
      let keys = [];
      if(pathname.includes(":")){ // 路径参数
        let regStr = pathname.replace(/:([^/]*)/g,function () {
          keys.push(arguments[1]);
          return '([^\/]*)'
        });
        layer.params = keys; // 放好需要的数组
        layer.reg = new RegExp(regStr); // 把路径转化成正则
      }
      app.routes.push(layer);
    }
  });
  app.all = function (pathname,handler) {
    let layer = {
      method:'all', // 匹配所有的方法
      pathname,
      handler
    }
    app.routes.push(layer);
  }
  app.listen = function (...args) {
    let server = http.createServer(app);
    server.listen(...args);
  }
  return app
}

module.exports = createApplication;