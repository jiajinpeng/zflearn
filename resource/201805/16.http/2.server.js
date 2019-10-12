let http = require('http');

let server = http.createServer(function (req,res) {
  console.log(req.headers);
  console.log(req.method);
  console.log(req.url);
  let arr = [];
  req.on('data',function (data) {
    console.log('xxx');
    arr.push(data);
  });
  req.on('end',function (params) {
    let r = Buffer.concat(arr).toString();
    // body-parser
    if (req.headers['content-type'] === 'x-www-form-urlencoded'){
      let querystring = require('querystring');
      r = querystring.parse(r); // a=1&b=2
      console.log(r);
    } else if (req.headers['content-type'] === 'application/json'){
      console.log(JSON.parse(r));
    } else{
      console.log(r);
    }
    res.end('我死了'); // 结束了
  })
});

server.listen(3000);