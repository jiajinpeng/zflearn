let http = require('http');
let opts = {
  host:'news.baidu.com',
}
http.createServer(function (req,res) {
  let client = http.request(opts,function (r) {
    let arr= [];
    r.on('data',function (data) {
      arr.push(data);
    });
    r.on('end',function() {
      let result = Buffer.concat(arr).toString();
      let lis = result.match(/<li class="bold-item"(?:[\s\S]*?)<\/li>/img);
      res.setHeader('Content-Type','text/html;charset=utf8');
      res.end(lis.join(''));
    })
  });
  client.end();
}).listen(3000);
// 跨域 指的是ajax 同源策略