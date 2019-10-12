let fs = require('fs');
module.exports.__express = function (p,obj,callback) {
  let  str = fs.readFileSync(p,'utf8');
  let replaceStr = str.replace(/<%=([\s\S]*)%>/g,function () {
    console.log(arguments[1])
    return obj[arguments[1]]
  })
  callback(replaceStr);
}