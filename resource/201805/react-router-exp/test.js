let pathToRegExp = require('path-to-regexp');

// 把路径转化正则 express params


let str = '/user/1/2'    // pathname = /user
let path = '/user/:id/:name'; // 我配的路径 // Route path="/"
let keys = [];
let reg = pathToRegExp(path,keys,{end:true});
let [,...arr] = str.match(reg);
let params = keys.reduce((prev,next,idx)=>(prev[keys[idx].name] = arr[idx],prev),{})
console.log(params);