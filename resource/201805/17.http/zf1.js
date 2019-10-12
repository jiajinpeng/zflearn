let http = require('http');

let server = http.createServer(function (req,res) {
  let key = req.headers.key;
  if(key === 'zfpx'){
    res.end('zf1');
  }else{
    res.end('Not allowed')
  }
}).listen(3001);
// 这是google