let fs = require('fs');
let ejs = require('ejs');
let path = require('path');
let r = fs.readFileSync(path.join(__dirname,'./1.html'),'utf8');
let school = {name:'zfpx'};
function render(r,obj) {
  return r.replace(/<%=([\s\S]*?)%>/g,function () {
    return obj[arguments[1]];
  })
}
console.log(render(r, school));