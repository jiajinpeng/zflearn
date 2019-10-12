let http = require('http');
let methods = require('methods');
let url = require('url');
let util = require('util');
let fs = require('fs');
function createApplication() {
  // 监听函数,请求到来时执行
  function app(req, res) {
    let method = req.method.toLowerCase();
    // req.url = /a?a=1
    let { pathname, query } = url.parse(req.url,true);
    // express 干的最常见的事 就是扩展原生req和res
    let index = 0;
    function next(err) {
      let layer = app.routes[index++];
      if(layer){ // 有层
        if(err){
          // 处理错误的 应该找到错误处理中间件
          if (layer.method === 'middle' && layer.handler.length===4 ){
            return layer.handler(err,req,res,next)
          }else{
            next(err);
          }
        }else{
          if (layer.method === 'middle') { // 中间件
            // 中间件要匹配路径   1. /user  /user  2./user /  3. /user/b  /user
            if (layer.pathname === '/' || req.path.startsWith(layer.pathname + '/') || req.path === layer.pathname) {
              return layer.handler(req, res, next); // 把控制权给了用户
            } else {
              next(); // 匹配不到路径就跳过去
            }
          } else {
            if (layer.params) { // 路径参数 需要生成params
              if (layer.method === method && (layer.reg.test(req.path))) {
                let matchers = req.path.match(layer.reg); // ['匹配到字符','1','2']
                req.params = layer.params.reduce((memo, current, index) => (memo[current] = matchers[index + 1], memo), {});
                return layer.handler(req, res);
              }
            }
            if ((layer.pathname === req.path || layer.pathname === '*') && (layer.method === method || layer.method === 'all')) {
              return layer.handler(req, res);
            }
            next()
          }
        }
        
      }else{
        res.end(`Cannot ${pathname} ${method}`);
      }
    }
    next();
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

  app.use = function (pathname,handler) {
    if(typeof handler !== 'function'){
      handler = pathname;
      pathname = '/';
    }
    let layer = {
      method:'middle',
      pathname,
      handler
    }
    app.routes.push(layer);
  }


  app.all = function (pathname,handler) {
    let layer = {
      method:'all', // 匹配所有的方法
      pathname,
      handler
    }
    app.routes.push(layer);
  }
  app.use(function (req,res,next) { // express 内置了一个扩展 req 和res的中间件
    let method = req.method.toLowerCase();
    // req.url = /a?a=1
    let { pathname, query } = url.parse(req.url, true);
    req.path = pathname;
    req.query = query;
    req.hostname = req.headers.host.split(':')[0];
    res.send = function (params) {
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      if (typeof params === 'object') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        res.end(util.inspect(params));
      } else if (typeof (params) === 'number') {
        res.statusCode = params;
        res.end(require('_http_server').STATUS_CODES[params]);
      } else {
        res.end(params);
      }
    }
    res.sendFile = function (pathname) {
      res.setHeader('Content-Type', require('mime').getType(pathname) + ';charset=utf8');
      fs.createReadStream(pathname).pipe(res);
    }
    next();
  })
  app.listen = function (...args) {
    let server = http.createServer(app);
    server.listen(...args);
  }
  return app
}

module.exports = createApplication;