let express = require('./express');
let app = express();
let bodyparser = require('./body-parser');
app.use(bodyparser.urlencoded({extended:true})); // a=b
app.use(bodyparser.json());
app.post('/user',function (req,res) {
  console.log(req.body)
})
app.get('/ejs',function (req,res) {
  res.render('a',{name:'zfpx'});
})
app.listen(3000);
// koa-router express自带
// koa-static  express自带
// koa-views   express自带
// koa-bodyparser body-parser