let http = require('http')
// let server = http.createServer()

// server.on('request',(req,res)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/plan;charset=utf-8')
//     res.setHeader('name','kim')
//     res.end('说散就散')
// })
// server.listen(3000)

// server.on('request',(req,res)=>{
//     let arr = []
//     req.on('data',(data)=>{
//         arr.push(data)
//     })
//     req.on('end',()=>{
//         let str = Buffer.concat(arr)
//         console.log(str.toString())
//         res.end(str.toString())
//     })
// })
// server.listen(3000)

// let options = {
//     hostname:'localhost',
//     path:'/a',
//     port:3000,
//     method:'post',
//     headers:{
//         a:1,
//         'Content-Length':5
//     }
// }

// let client = http.request(options,(res)=>{
//     res.on('data',(data)=>{
//         console.log(data.toString())
//     })
// })
// // client.write('world')
// client.end('world');

//爬百度数据
let server = http.createServer((req,res)=>{
    let options = {
        hostname:'news.baidu.com',
        port:80,
        method:'get'
    }
    let client = http.request(options,r=>{
        let arr = []
        r.on('data',data=>{
            arr.push(data)
        })
        r.on('end',()=>{
            let result = Buffer.concat(arr).toString()
            result = result.match(/<li class="bold-item"([\s\S]*?)<\/li>/img);
            res.setHeader('Content-Type','text/html;charset=utf8')
            res.end(result.join('\r\n'))
        })
    })
    client.end()
})
server.listen(8080)