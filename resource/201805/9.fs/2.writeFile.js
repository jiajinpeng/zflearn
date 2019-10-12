let fs = require('fs');
let path = require('path');



// 写入时默认文件存在就创建，有文件的话 会被清空
// 写入时 他会把内容以二进制的形式写入进去
// Buffer.from({data:1}.toString())
// fs.writeFile(path.join(__dirname,'1.txt'),'{data:1}',function(err){
//     console.log('成功')
// });

// fs.appendFile(path.join(__dirname,'1.txt'),'{data:1}',function(err){
//     console.log('成功')
// });

// 拷贝方法
// fs.readFile(path.join(__dirname,'1.txt'),(err,data)=>{
//     fs.writeFile(path.join(__dirname,'2.txt'),data,(err)=>{
//         console.log('拷贝成功')
//     })
// });
// fs.copyFile
// 不能读一点写一点，想指定位置读取

// fs.open fs.read  fs.write fs.close