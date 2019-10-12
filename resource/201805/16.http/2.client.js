let opts = {
  host:'localhost',
  port:3000,
  path:'/hello',
  headers:{
    'a':1,
    'Content-Type':'x-www-form-urlencoded',
    "Content-Length":3
  }
}
let http = require('http');
let client = http.request(opts,function (res) {
  res.on('data',function (data) {
      console.log(data);
  })
});
client.end("a=1"); // 表示把请求发出去
