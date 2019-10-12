let http = require('http');
let path = require('path');
let fs = require('fs');
let { promisify} = require('util');
let stat = promisify(fs.stat);
let url = require('url'); 
// 先访问服务器 服务器告诉他10s别来烦我
// 过了10s会继续烦我，先看下一下是否被修改过，如果没改过返回304，客户端从缓存中读取结果
let server = http.createServer(async function (req,res) {
  let { pathname,query} = url.parse(req.url,true);
  let readPath = path.join(__dirname, 'public', pathname);
  try {
  let statObj = await stat(readPath);
  res.setHeader('Cache-Control','no-cache');
    if (statObj.isDirectory()) {
      let p = path.join(readPath, 'index.html');
      let statObj = await stat(p);
      res.setHeader('Last-Modified', statObj.ctime.toGMTString());
      if (req.headers['if-modified-since'] === statObj.ctime.toGMTString()){
        res.statusCode = 304;
        res.end();
        return; // 走缓存
      }
      fs.createReadStream(p).pipe(res);
    } else {
      res.setHeader('Last-Modified', statObj.ctime.toGMTString());
      if (req.headers['if-modified-since'] === statObj.ctime.toGMTString()) {
        res.statusCode = 304;
        res.end();
        return; // 走缓存
      }
      fs.createReadStream(readPath).pipe(res);
    }
  }catch(e){
    res.statusCode = 404;
    res.end(`Not found`);
  }
}).listen(3000);