let fs  =require('fs');
let path = require('path');
// 先序广度遍历
function rmdirSync(dir){
    let arr = [dir]; // 创建一个记录表
    let index = 0 ; // 从记录表里拿出第一项 a
    let current; // a
    while(current = arr[index++]){
        let dirsPath = fs.readdirSync(current); // [b,c]
        dirsPath = dirsPath.map(item=> path.join(current,item)); // => [a/b,a/c]
        arr = [...arr,...dirsPath] // => [a,a/b,a/c]
    };
    for(let i =arr.length-1;i>=0;i--){
        fs.rmdirSync(arr[i]);
    }
}
rmdirSync('a');

// 用传统的回调 fs.readdir  fs.rmdir 实现广度删除

// 下次课 先序深度遍历 同步 异步 async + await
// 流
