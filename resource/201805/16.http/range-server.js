let http = require('http');
let fs = require('fs');
let path = require('path');
// 当前要下载的文件的大小
let size = fs.statSync(path.join(__dirname, 'my.txt')).size;
console.log(size);
let server = http.createServer(function (req, res) {
  let range = req.headers['range']; // 0-3
  if (range) {
    let [, start, end] = range.match(/(\d*)-(\d*)/);
    start = start ? Number(start) : 0;
    end = end ? Number(end) : size - 1; // 10个字节 size 10  （0-9）
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size - 1}`);
    fs.createReadStream(path.join(__dirname, 'my.txt'), { start, end }).pipe(res);
  } else {
    // 会把文件的内容写给客户端
    fs.createReadStream(path.join(__dirname, 'my.txt')).pipe(res);
  }
});
server.listen(3000);