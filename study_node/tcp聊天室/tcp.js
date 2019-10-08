let net = require('net')
let client = {}
let server = net.createServer((socket)=>{
    socket.write('欢迎')
    server.maxConnections = 2//设置最大连接数
    server.getConnections((err,cont)=>{//获取当前人数
        socket.write(`当前在线人数:${cont}\r\n`)
        socket.write(`请输入用户名:\r\n`)
    })
    let name 
    socket.setEncoding('utf8')
    socket.on('data',(chunk)=>{//监听用户输入
        if(name){//发送消息
            Object.keys(client).forEach(el=>{
                if(el != name){
                    client[el].write(`${name}:${chunk}`)
                }
            })
        }else{//输入昵称
            name = chunk.replace('\r\n','')
            client[name] = socket
        }
    })
}).listen(3000)