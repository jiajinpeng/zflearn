let express = require('express');
let app = express(); 
// koa的路由 /article/:id
// 路径参数params
app.get('/adduser/:id/:name',function (req,res) {
  res.end(`id up = ${req.params.id} name = ${req.params.name}`);
});

app.get('/',function (req,res) {
  res.end('hello');
});
app.get('/user', function (req, res) {
  res.end('get /user');
});
// all代表所有的方法
app.all('/user',function (req,res) {
  res.end('all /user')
});
app.all('*', function (req, res) {
  res.end('all *')
});
app.listen(3000,function () {
  console.log(`server start 3000`);
}); 