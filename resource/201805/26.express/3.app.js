let express = require('./express');
let app = express();
// koa-static 静态服务中间件，可以把当前传递的目录当成静态文件资源目录
app.use(express.static(__dirname));
app.set('views','view');// 更改搜索的文件夹
app.set('view engine','html');// 更改省略的后缀
app.engine('html',require('./ejs').__express); // 告诉express ejs后缀的文件用ejs来渲染
app.get('/a',function (req,res) {
  res.sendFile(require('path').join(__dirname, './params.js'))
});
app.get('/ejs',function (req,res) {
  res.render('a',{name:'zfpx'});
})
app.get('/redirect',function (req,res) {
    res.redirect('http://www.zhufengpeixun.cn')
})
app.listen(3000);
// koa-router express自带
// koa-static  express自带
// koa-views   express自带
// koa-bodyparser body-parser