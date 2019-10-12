let http = require('http');

let server = http.createServer();

server.on('request',function (req,res) {
    let arr = [];
    res.setCookie = function (key,value,opts={}) {
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
    req.cookies = require('querystring').parse(req.headers.cookie,'; ','=');
    
    // 如果你第一次来 没有cookie叫visit的属性 我就认为你是第一次
    if(req.url === '/visit'){
      console.log(req.headers);
      res.setHeader('Content-Type','text/html;charset=utf8');
      let v = req.cookies['visit'];
      if (v) {
        v = Number(v)+1
        res.setCookie('visit', v,{httpOnly:true});
        res.end('当前你是第' + (v)+'次来的')
      }else{
        res.setCookie('visit',1);
        res.end(`欢迎你 你是第一次到来的`)
      }
    }
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

