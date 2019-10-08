let http = require('http')
let fs = require('fs')
let pause = false
let ws = fs.createWriteStream(__dirname+'/download.txt')
let options = {
    hostname: 'localhost',
    port: 3000,
}

let start = 0

process.stdin.on('data',(data)=>{
    data = data.toString()
    if(data.match(/p/)){
        pause = true
    }else{
        pause = false
        download()
    }
})

function download(){
    options.headers = {
        'Range': `bytes=${start}-${start+4}`
    }
    start += 5
    http.get(options,(res)=>{
        let buffer = []
        let total = parseInt(res.headers['content-range'].split('/')[1])
        res.on('data',(data)=>{
            buffer.push(data)
        })
        res.on('end',()=>{
            let str = Buffer.concat(buffer).toString()
            ws.write(str)
            if(!pause && start < total){
                setTimeout(()=>{
                    download()
                },1000)
            }
        })
    })
}
download()