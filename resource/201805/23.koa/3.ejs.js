let path = require('path');
let fs = require('fs');
let r = fs.readFileSync(path.join(__dirname, './1.html'), 'utf8');
let obj = { arr: [1, 2, 3] };

function render(str,obj) {
  let head = `let tmpl=''\r\n`;
  head += `with (obj) {\r\n`
  let content = 'tmpl+=`\r\n';
  str = str.replace(/<%=([\s\S]*?)%>/g,function () {
    return '${'+arguments[1]+'}'
  })
  content +=str.replace(/<%([\s\S]*?)%>/g,function () {
      return '`\r\n'+arguments[1] +"\r\ntmpl+=`"
  })
  let tail = '`}\r\n return tmpl';
  return head + content + tail
}
r = render(r,obj);
let fnStr = new Function('obj',r);
let result = fnStr(obj);
fs.writeFile('./1.js',result)

// with 
// function render() {
//   let tmpl = ``
//   with (obj) {
//     arr.forEach(item => {
//       tmpl +=`<li>hello</li>`
//     });
//   }
//   return tmpl;
// }
// let str = render();
// console.log(str);