// 要实现打开网页后可以将目录下的内容展示给用户,海可以进行对应的点击操作
// 缓存，gzip压缩 ， 范围请求....
// 提示用户的命令
// 发包
let http = require('http');

let util = require('util');
let url = require('url');
let zlib = require('zlib');
let fs = require('fs');
let path = require('path');
//第三方
let ejs = require('ejs'); // 模板引擎
let template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

let chalk = require('chalk'); // 粉笔
let mime = require('mime');   // 类型模块
// 需要 当你电脑上有 环境变量 DEBUG=hello时 才会输出对应的内容
let debug = require('debug')('hello'); // 调试模块
// 在写代码的时候 可能会打印出很多日志 发包后不希望日志被打印
let config = require('./config');

let stat = util.promisify(fs.stat);
let readdir = util.promisify(fs.readdir);
class Server {
  constructor(command) { // 用用户在命令行种输入的内容进行显示
    this.config = { ...config, ...command};
    this.template = template;
  }
  async handleRequest(req, res) {
    let { dir } = this.config; // 需要将请求的路径和dir拼接在一起
    // http://localhost:3000/index.html
    let { pathname } = url.parse(req.url);
    
    if (pathname === '/favicon.ico') return res.end();
    pathname = decodeURIComponent(pathname);
    let p = path.join(dir, pathname);
    try {
      // 判断当前路径是文件 还是文件夹
      let statObj = await stat(p);
      if (statObj.isDirectory()) {
        // 读取当前访问的目录下的所有内容 readdir 数组 把数组渲染回页面
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        let dirs = await readdir(p);
        dirs = dirs.map(item=>({
          name:item,
          // 因为点击第二层时 需要带上第一层的路径，所有拼接上就ok了
          href:path.join(pathname,item)
        }))
        let str = ejs.render(this.template, {
          name: `Index of ${pathname}`,
          arr: dirs
        });
        res.end(str);
      } else {
        this.sendFile(req, res, statObj, p);
      }
    } catch (e) {
      debug(e); // 发送错误
      this.sendError(req, res);
    }
  }
  /**
   * 此方法用来处理用户缓存
   */
  cache(req, res, statObj, p){
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).getTime());
    // 比较etag ctime+size 比较last-modified ctime
    // 服务端想要设置的
    let etag = statObj.ctime.getTime()+'-'+statObj.size;
    let lastModified = statObj.ctime.getTime();
    // 把这两个参数设置给客户端
    res.setHeader('Etag', etag);
    res.setHeader('Last-Modified', lastModified);
    // 客户端把上次设置的带过来的
    let ifNoneMatch = req.headers['if-none-match'];
    let ifModifiedSince = req.headers['if-modified-since'];
    // 有其中任何一个不生效就不生效
    if (etag !== ifNoneMatch && lastModified !== ifModifiedSince){
      return false
    }
    return true;
  }
  gzip(req, res, statObj, p){
    let encoding = req.headers['accept-encoding'];
    if(encoding){
      if(encoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')
        return zlib.createGzip();
      }
      if (encoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return zlib.createDeflate();
      }
      return false;
    }else{
      return false
    }
  }
  // 范围请求
  range(req, res, statObj, p){
    let range  = req.headers['range'];
    if(range){
    let [,start,end] = range.match(/bytes=(\d*)-(\d*)/);
    start = start? Number(start):0;
    end = end? Number(end):statObj.size - 1;
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size - 1}`);
      fs.createReadStream(p,{start,end}).pipe(res);
    }else{
      return false;
    }
  }
  sendFile(req, res, statObj, p) {
    // 设置缓存，如果文件以及打开过了 要下一次多少秒内不要再次访问了
    // 下次再访问服务器的时候 要使用对比缓存
    if (this.cache(req, res, statObj, p)){
      res.statusCode = 304;
      return res.end();
    }
    if (this.range(req, res, statObj, p)) return
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
    let transform = this.gzip(req, res, statObj, p)
    if (transform){ // 返回一个压缩后的压缩流
      return fs.createReadStream(p).pipe(transform).pipe(res);
    }
    fs.createReadStream(p).pipe(res);
  }
  sendError(req, res) {
    res.statusCode = 404;
    res.end(`Not found`);
    this.start();
  }
  start() {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.config.port, this.config.host, () => {
      console.log(`server start http://${this.config.host}:${chalk.green(this.config.port)}`);
    });
  }
}
module.exports = Server;

// 1.tcp 视频 
// 2.关于http
// 3.写一个命令行