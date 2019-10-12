process.stdout.on('data',function(data){
    // 文件描述符
    process.stderr.write(data);
    // 这里收到的数据 如果是close  fs.sync 在关闭文件
});