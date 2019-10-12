let opts = {
  host:'localhost',
  port:3000,
  headers:{}
}
let http = require('http');
let start = 0;
let fs = require('fs');
let pause = false;
process.stdin.on('data',function (data) {
  if (data.toString().includes('p')){
    pause = true
  }else{
    pause = false;
    download()
  }
})
function download() {
  opts.headers.Range = `bytes=${start}-${start+3}`;
  start+=4;
  let client = http.request(opts,function (res) {
      let total = res.headers['content-range'].split('/')[1];
      res.on('data',function (data) {
        fs.appendFileSync('./download.txt',data);
      });
      res.on('end',function () {
        setTimeout(() => {
          if (!pause&&start < total)
            download();
        }, 1000);
      })
  });
  client.end();
}
// 爬虫 自己起一个服务 创建一个请求 获取别人页面
download();