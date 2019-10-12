let http = require('http');

let server = http.createServer();

server.on('request',function (req,res) {
    let arr = [];
    // 设置cookie
    res.setCookie = function (key,value,opts) {
      let arrs = [];
      if(opts.httpOnly){
        arrs.push(`httpOnly=true`)
      }
      if(opts.maxAge){
        arrs.push(`Max-Age=${opts.maxAge}`)
      }
      arr.push(`${key}=${value}; ${arrs.join('; ')}`)
      res.setHeader('Set-Cookie', arr)
    }
    // 读取cookie 设置cookie  
    req.cookies = require('querystring').parse(req.headers.cookie,'; ','=');
    if(req.url === '/read'){
      return res.end(req.cookies['name']);
    }
    if(req.url === '/write'){
      res.setCookie('name','zfpx',{httpOnly:true,maxAge:8});
      res.setCookie('age','9',{httpOnly:true});
      res.end('write ok');
    }
    res.end('not found');
});
server.listen(3000);

// domain 限制域名 默认是当前的主机 a.zf1.cn b.zf1.cn
// 限制读取的路径path=/read
// max-age=5
// Exipres
// httpOnly仅限服务器使用 客户端无法操作
// 设置多个cookie 可以采用数组的方式
// res.setHeader('Set-Cookie', ['name=zfpx; httpOnly=false', 'age=9; httpOnly=false']);
// return res.end('write ok');


// name=zfpx  我很帅
// age=9      呵呵



// name=zfpx1  我很帅
// age=9      呵呵