// 304 服务端设置 
// 缓存策略:强制缓存 200 from memory from disk
// 对比缓存 先比一下在走缓存

let http = require('http');
let path = require('path');
let fs = require('fs');
let { promisify} = require('util');
let stat = promisify(fs.stat);
// 静态服务器
// localhost:3000/index.html?a=1
let url = require('url'); // 专门用来处理url路径的
// http://username:password@hostname:port/pathname?query
let server = http.createServer(async function (req,res) {
  let { pathname,query} = url.parse(req.url,true); // 就是将query转化成对象
  let readPath = path.join(__dirname, 'public', pathname);
  try {
  let statObj = await stat(readPath);
  // 根客户端说 10m内别来烦我
  res.setHeader('Cache-Control','max-age=10');
  res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());
  
    if (statObj.isDirectory()) {
      let p = path.join(readPath, 'index.html');
      await stat(p);
      // 如果当前目录下有html那么就返回这个文件
      fs.createReadStream(p).pipe(res);
    } else {
      // 是文件 读取对应的文件直接返回即可
      fs.createReadStream(readPath).pipe(res);
    }
  }catch(e){
    res.statusCode = 404;
    res.end(`Not found`);
  }
}).listen(3000);