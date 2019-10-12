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
      if (layer.pathname === req.path && layer.method === method ){
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
      app.routes.push(layer);
    }
  })
  app.listen = function (...args) {
    let server = http.createServer(app);
    server.listen(...args);
  }
  return app
}

module.exports = createApplication;