let fs = require('fs');
let path = require('path');
// 1.txt => 2.txt

// 1.准备打开 1.txt 和 2.txt
const BUFFER_SIZE = 5;
let readPos = 0;
let writePos = 0;
// 异步的递归是如何操作的 
fs.open(path.join(__dirname, '1.txt'), 'r', (err, rfd) => {
    fs.open(path.join(__dirname, '2.txt'), 'w', (err, wfd) => {
        function next() {
            let buf = Buffer.alloc(BUFFER_SIZE); // 申请读出来的buffer的长度
            fs.read(rfd, buf, 0, BUFFER_SIZE, null, (err, byteRead) => {
                if (byteRead > 0) {
                    // 写入读取到的个数 可能想读10个 但是只有5个
                    readPos += byteRead
                    fs.write(wfd, buf, 0, byteRead, null, (err, byteWritten) => {
                        writePos += byteWritten;
                        next();
                    });
                }else{
                    fs.close(rfd,()=>{ });
                    // 读取完毕 不一定表示写入完毕 
                    fs.fsync(wfd,()=>{
                        fs.close(wfd,()=>{})
                    });
                }
            })
        }
        next();
    });
});

