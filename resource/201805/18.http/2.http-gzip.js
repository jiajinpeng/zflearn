let http = require('http');
let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
http.createServer(function (req,res) {
  if(req.url === '/download'){
    res.setHeader('Content-Disposition', 'attachment' )
    return fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
  }
  let rule = req.headers['accept-encoding'];
  if(rule){
    if(rule.match(/\bgzip\b/)){
      res.setHeader('Content-Encoding','gzip');
      fs.createReadStream(path.join(__dirname, '1.html'))
      .pipe(zlib.createGzip())
      .pipe(res);
    } else if (rule.match(/\bdeflate\b/)){
      res.setHeader('Content-Encoding', 'deflate');
      fs.createReadStream(path.join(__dirname, '1.html'))
        .pipe(zlib.createDeflate())
        .pipe(res);
    }else{
      fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
    }
  }else{
    fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
  }
}).listen(3000);