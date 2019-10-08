let http = require('http')
let path = require('path')
let fs = require('fs')
let file = path.join(__dirname,'1.txt')
let {promisify} = require('util')
let stat = promisify(fs.stat)
let server = http.createServer()

server.on('request',async (req,res)=>{
    let range = req.headers['range']
    let s = await stat(file)
    let size = s.size
    if(range){
        let [,start,end] = range.match(/(\d*)-(\d*)/)
        start = start ? Number(start) : 0
        end = end ? Number(end) : size -1
        res.statusCode = 206
        res.setHeader('Accept-Ranges','bytes')
        res.setHeader('Content-Length',end-start+1)
        res.setHeader('Content-Range',`bytes ${start}-${end}/${size}`)
        fs.createReadStream(file,{start,end}).pipe(res)
    }else{
        fs.createReadStream(file).pipe(res);
    }
})
server.listen(3000)