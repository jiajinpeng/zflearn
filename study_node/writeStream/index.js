let fs = require('fs')
let RS = require('./readStream')
let WS = require('./writeStream')

let rs = new RS(__dirname+'/2.txt',{
    highWaterMark:3
})
let ws = new WS(__dirname+'/1.txt',{
    highWaterMark:1
})
// let flag = ws.write('1')
// console.log(flag)
// flag = ws.write('2')
// console.log(flag)
// ws.once('drain',()=>{
//     console.log('排干')
//     flag = ws.write('3')
//     console.log(flag)
// })

// let i = 5
// function write(){
//     let flag = true
//     while(flag&&i>=0){
//         console.log(i)
//         flag = ws.write(i--+'')
//     }
// }
// ws.on('drain',()=>{
//     console.log('排干')
//     write()
// })
// write()

rs.pipe(ws)