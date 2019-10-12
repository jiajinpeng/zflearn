let fs = require('fs');
let path = require('path');
// mode 权限   r 4  w 2   x 1  chmod 777 666 0o438
// 二爷一直4读书
// file descriptor 文件描述符(数字类型)
// process.stdin 0 process.stdout 1 process.stderr 2

// 2)写入 
fs.open(path.join(__dirname,'1.txt'),'w',(err,fd)=>{
    let buf = Buffer.from('珠峰');
    // buf 指的是读取的buffer
    // 0 从buffer哪个位置读取
    // 6  读取多少个buffer往里写
    // 0 从文件哪个位置写入
    // bytesWritten实际写入的个数
    fs.write(fd,buf,0,4,0,(err,bytesWritten)=>{
        console.log('写入成功')
    })
})



// 1) 读取部分内容
// fs.open(path.join(__dirname,'1.txt'),'r',(err,fd)=>{
//     let buffer = Buffer.alloc(5);
//     /**
//      * fd文件，描述符
//      * buffer 读取到那个buffer中
//      * 0 从buffer哪个地方开始写入
//      * 5 写入多长
//      * 1 从文件的那个位置开始读取
//      * bytesRead实际读取到的个数
//      */
//     fs.read(fd,buffer,0,4,1,(err,bytesRead)=>{
//         console.log(buffer.toString());
//         fs.close(fd,()=>{
//             console.log('关闭')
//         })
//     });
// });

