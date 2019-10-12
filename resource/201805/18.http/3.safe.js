let http =  require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
// 这是百度的服务器
let whiteList = ['www.zf1.cn:3000'];
let server = http.createServer(function (req,res) {
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname,pathname);
  fs.stat(realPath,function(err,statObj) {
    if(err){
      res.statusCode = 404;
      res.end();
    }else{
      let referer = req.headers['referer'] || req.headers['referred'];
      if(referer){
        let current = req.headers['host'] // 代表的是当前图片的地址
        referer = url.parse(referer).host// 引用图片的网址
        if (current === referer || whiteList.includes(referer)){
          fs.createReadStream(realPath).pipe(res);
        }else{
          fs.createReadStream(path.join(__dirname,'images/2.jpg')).pipe(res);
        }
      }else{
        fs.createReadStream(realPath).pipe(res);
      }
    }
  })
}).listen(3000);