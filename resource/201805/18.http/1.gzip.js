// 服务端要启用压缩

//Content-Encoding: gzip 服务器返回的头 告诉客户端我用gzip压缩过了
//Accept-Encoding: gzip, deflate, br 浏览器和服务器说 我支持这几种压缩格式


let zlib = require('zlib'); // 专门做压缩的包
let fs = require('fs');
let path = require('path');
function gzip(filePath) {
  let transform = zlib.createGzip();
  fs.createReadStream(filePath).pipe(transform).pipe(fs.createWriteStream(filePath+'.gz'));
}
 gzip('1.txt');


function gunzip(filePath) {
  let transform = zlib.createGunzip();
  fs.createReadStream(filePath).pipe(transform).pipe(fs.createWriteStream(path.basename(filePath,'.gz')));
}
//gunzip('1.txt.gz');
