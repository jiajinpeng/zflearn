process.argv.slice(2).forEach(item=>{
    process.send(item);
});
process.send('close');

// 可写流的方法process.stdout.write