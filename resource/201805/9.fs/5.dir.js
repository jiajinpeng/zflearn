// 目录操作 创建文件 删除文件夹 
// 先序深度优先遍历 
// 广度优先遍历 

let fs = require('fs');
let util = require('util');
let access = util.promisify(fs.access);
let mkdir = util.promisify(fs.mkdir);

// function promisify(fn){
//     return function(p){
//         return new Promise((resolve,reject)=>{
//             fn(p,(flag)=>{
//                resolve(flag)
//             })
//         })
//     }
// }
// let exists = promisify(fs.exists);
// exists('./a').then(data=>{
//     console.log(data);
// })

async function makep(p) {
    let paths = p.split('/');
    for (let i = 0; i < paths.length; i++) {
        let dirPath = paths.slice(0, i + 1).join('/');
        try{
            await access(dirPath)
        }catch(e){
            await mkdir(dirPath);
        }
    }
}
makep('a/b/c/d/e').then(data => {
    console.log('创建成果')
})
// function makep(p,fn){
//     let paths = p.split('/');
//     let index = 0;
//     function next(){
//         if(index ===paths.length ) return fn();
//         let realPath = paths.slice(0,++index).join('/');
//         // 如果文件无法访问到 那就说明文件不存在则创建 反过来如果文件 存在就创建一下个
//         fs.access(realPath,(err)=>{
//             if(err){
//                 fs.mkdir(realPath,(err)=>{
//                     next();
//                 });
//             }else{
//                 next();
//             }
//         })
//     }
//     next();
// }
// makep('e/d/e/g/s/q',()=>{
//     console.log('ok')
// })


// 可以创建多级目录
// function makep(p) {  // 同步创建目录
//     let paths = p.split('/');
//     for (let i = 0; i < paths.length; i++) {
//         let dirPath = paths.slice(0,i+1).join('/');
//         try{
//             // 如果能访问到 不干任何事 ，访问不到才创建
//             fs.accessSync(dirPath);
//         }catch(e){
//             fs.mkdirSync(dirPath);
//         }
//     }
// }
// makep('a/b/c/d/e');