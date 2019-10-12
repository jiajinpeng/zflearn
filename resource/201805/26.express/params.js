// app.get('/adduser/:id/:name', function (req, res) {
//   res.end(`id = ${req.params.id} name = ${req.params.name}`);
// });
// id=>19 name=>zfpx  

// /adduser/200/zfpx
// /adduser/:id/:name  => ['id','name'];
// /adduser/:id/:name=> /\/adduser\/(\w+)\/(\w+)/
//  /adduser/200/zfpx.match(/\/adduser\/(\w+)\/(\w+)/) =>[200,zfpx]
// ['id','name']+[19,zfpx] = req.params = {id:200,name:zfpx}


let url = '/adduser/200/zfpx';
let p = '/adduser/:id/:name';
let keys = [];
let regStr = p.replace(/:([^/]*)/g,function () {
  keys.push(arguments[1]);
  return "([^\/]*)"
});
let reg = new RegExp(regStr);
console.log(reg);
let result = url.match(reg);
console.log(result)
let params = keys.reduce((memo,current,index)=>(
  memo[current] = result[index+1], memo
),{});
console.log(params);