let fs = require('fs');
let path = require('path');
Buffer.prototype.split = function (sep) {
  let arr = [];
  let pos = 0;
  let index = 0;
  let len = Buffer.from(sep).length;
  while (-1!==(index=this.indexOf(sep,pos))) {
    arr.push(this.slice(pos,index));
    pos = index+len;
  }
  arr.push(this.slice(pos));
  return arr
}

function betterBody({ uploadDir }) {
  return async (ctx, next) => {
    // 处理请求体的过程
    await new Promise((resolve,reject)=>{
      let arr = [];
      ctx.req.on('data',function (data) {
        arr.push(data);
      });
      ctx.req.on('end',function () {
        let boundary = ctx.get('Content-Type').split('=')[1];
        boundary = '--'+boundary;
        let buffer = Buffer.concat(arr);
        let obj = {};
        let lines = buffer.split(boundary).slice(1,-1);
        lines.forEach(line=>{
          let [head,tail] = line.split("\r\n\r\n");
          head = head.toString();
          if(head.includes('filename')){ // 这是文件
            console.log('-----------------');
            console.log(line.slice(head.length + 4, -2));
            fs.writeFileSync(Math.random() + '', line.slice(head.length + 4, -2));
          }else{
            // 文本
            let name = head.match(/name="(\w*)"/)[1];
            obj[name] = tail.toString().slice(0,-2);
          }
        });
        console.log(obj);
        resolve();
      })
    });
    // 处理后继续走下一个中间件
    await next();
  }
}

module.exports = betterBody;