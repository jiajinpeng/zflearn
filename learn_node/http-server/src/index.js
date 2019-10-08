let http = require('http')
let util = require('util')
let url = require('url')
let fs = require('fs')
let path = require('path')

let ejs = require('ejs')
let chalk = require('chalk')
let mime = require('mime')


let stat = util.promisify(fs.stat);
let readdir = util.promisify(fs.readdir);
let template = fs.readFileSync(path.join(__dirname,'template.html'),'utf8')
let config = require('./config')

class Server {
    constructor(command){
        this.config = { ...config, ...command }//将配置挂载到实例上
        this.template = template//获得模板文件
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this))//创建http服务
        server.listen(this.config.port,this.config.host,()=>{//监听默认端口
            console.log(`server start \r\n http://${this.config.host}:${chalk.green(this.config.port)}`)
        })
    }
    async handleRequest(req,res){
        let { dir } = this.config
        let { pathname } = url.parse(req.url)
        if (pathname === '/favicon.ico') return res.end();
        let p = path.join(dir,pathname)
        let statobj = await stat(p)
        if(statobj.isDirectory()){//是否为文件夹
            res.setHeader('Content-Type','text/html;charset=utf8')
            let dirs = await readdir(p)//读出目录列表
            dirs = dirs.map(item=>({
                name:item,
                href:path.join(pathname,item)
            }))
            let str = ejs.render(this.template,{//用ejs渲染出当前目录列表
                name:`Index of ${pathname}`,
                arr:dirs
            })
            res.end(str)
        }else{//如果为文件，直接读出文件内容
            this.sendFile(req, res, statobj, p);
        }
    }
    sendFile(req, res, statobj, p){//读出文件返回到页面中
        res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
        fs.createReadStream(p).pipe(res);
    }
}

module.exports = Server;