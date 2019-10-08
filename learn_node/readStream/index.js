let fs = require('fs')
let readStream = require('./readStream')

let rs = new readStream(__dirname+'/1.txt',{
    highWaterMark:3,
    flags:'r',
    autoClose:true,
    start:0,
    end:3,
    encoding:'utf8'
})

rs.on('open',()=>{
    console.log('文件打开了')
})

rs.on('data',(data)=>{
    console.log(data)
    rs.pause()
    setTimeout(()=>{
        rs.resume()
    },2000)
})

rs.on('end',()=>{
    console.log('读取完毕了')
})

rs.on('close',()=>{
    console.log('关闭')
})

rs.on('error',(err)=>{
    console.log(err)
})