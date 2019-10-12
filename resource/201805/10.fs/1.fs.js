// let fs = require('fs');
let path = require('path');
// fs.stat fs.readir fs.rmdir fs.unlink
// fs.readFile fs.writeFile fs.appendFile fs.exists
// fs.read  fs.write fs.rname fs.truncate  fs.access fs.open
// fs.watchFile 监控文件变化

// 流 


// 异步广度删除 async await
// 实现异步广度删除 异步回调  promise async + await





// 异步primise 深度优先 删除
// let {promisify} = require('util'); // async - > await
// let fs = require('mz/fs');
// async function removePromise(dir) {
//     let statObj = await fs.stat(dir);
//     if (statObj.isDirectory()) {
//       let files = await fs.readdir(dir);
//       files = files.map(file => removePromise(path.join(dir, file)));
//       await Promise.all(files); // 删除儿子
//       await fs.rmdir(dir);// 删除自己
//     } else {
//       await fs.unlink(dir);
//     }
// }
// removePromise('a').then(()=>{
//   console.log('删除成功');
// },err=>{
//   console.log(err);
// })
// function removePromise(dir) {
//     return new Promise((resolve,reject)=>{
//       fs.stat(dir,(err,statObj)=>{
//         if(statObj.isDirectory()){
//           fs.readdir(dir,(err,files)=>{
//             files = files.map(file=>path.join(dir,file));
//             // [a/b,a/c,a/1.js]
//             // 等待儿子删除后 删除自己
//             Promise.all(files.map(file =>removePromise(file))).then(()=>{
//               fs.rmdir(dir,resolve);
//             });
//           })
//         }else{
//           // 文件删除后 成功即可
//           fs.unlink(dir,resolve);
//         }
//       })
//     });
// }
// removePromise('a').then(()=>{
//   console.log('删除ok');
// })


// 并行
// function removeDir(dir, cb) {
//     fs.stat(dir,(err,statObj)=>{
//       if (statObj.isDirectory()){
//         fs.readdir(dir,(err,files)=>{
//           let paths = files.map(file=>path.join(dir,file));
//           // 获取每一个路径
//           if(paths.length>0){
//             let i = 0;
//             function done() { // Promise.all 等待异步都执行完后 再执行之后的操作 
//               i++;
//               if(i === paths.length){
//                 removeDir(dir, cb);
//               }
//             }
//             paths.forEach(p => {
//               // 删除某个后通知下 当删除的子目录个数 等于我们的子目录数，删除父级即可
//               removeDir(p,done);
//             })
//           }else{
//             fs.rmdir(dir,cb); // 当前目录下没东西直接删除即可
//           }
//         })
//       }else{
//         fs.unlink(dir,cb);
//       }
//     })
// }



// 异步深度优先 (串行 series paralle)
// function removeDir(dir,cb) { 
//     fs.stat(dir,(err,statObj)=>{
//       if (statObj.isDirectory()){
//         fs.readdir(dir,(err,files)=>{
//           let paths = files.map(file=>path.join(dir,file));
//           function next(index) {
//             // 第一次取出的是a/1.js
//             if (index === paths.length) return fs.rmdir(dir,cb);
//             let currentPath = paths[index];
//             // 文件删除后继续拿出下一项 继续删除
//             // 串行删除，删除完第一个，第一个删除完后调用第二个删除的方法
//             removeDir(currentPath,()=>next(index+1));
//           }
//           next(0);
//         })
//       }else{
//         fs.unlink(dir,cb);
//       }
//     })
// }
// removeDir('a',()=>{
//   console.log('删除成功');
// });

// 深度 有儿子就深入进去
// function removeDirSync(dir) {
//   let stateObj = fs.statSync(dir);
//   if(stateObj.isDirectory()){
//     // 是目录继续读取
//     let dirs = fs.readdirSync(dir);
//     dirs.forEach(d=>{
//       let p = path.join(dir,d);
//       removeDirSync(p);
//     });
//     // 儿子删除完成后继续删除自己
//     fs.rmdirSync(dir);
//   }else{
//     fs.unlinkSync(dir);
//   }
// }
// removeDirSync('a');
// 如果删除一个文件夹 先读取出 文件夹的内容fs.readdir
// 判断当前这个路径是文件夹还是文件，文件的状态 fs.stat
// statObj.isDirectory  statObj.isFile
// fs.rmdir 删除目录    fs.unlink 删除文件
// fs.readdir('a',function (err,files) {
//   let paths = files.map(dir => path.join('a', dir))
//   console.log(paths);
//   paths.forEach(p=>{
//     fs.stat(p,(err,statObj)=>{
//       if (statObj.isDirectory()){
//         fs.rmdir(p)
//       }else{
//         fs.unlink(p)
//       }
//     });
//   });
// });