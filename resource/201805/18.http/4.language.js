// Accept-Language: zh-CN,zh;q=0.9
// 特点是多个语言用 , 分割 权重用=分割 没有默认权重为1
let langs = {
  en:  'hello world',
  'zh-CN':'你好世界',
  zh:'你好',
  ja: 'こんにちは、世界'
}
// 
let defualtLanguage = 'en'
// 多语言方案  服务端来做 (浏览器会发一个头) 前端来做  通过url实现多语言
let http = require('http');
http.createServer(function (req,res) {
    let lan = req.headers['accept-language'];
    //[[zh,q=0.9],[zh-CN]] =>[{name:'zh-CN',q=1},{name:'zh',q:0.9}]
    if(lan){
      lan = lan.split(',');
      lan = lan.map(l=>{
        let [name,q] = l.split(';');
        q = q?Number(q.split('=')[1]):1 
        return {name,q}
      }).sort((a,b)=>b.q-a.q); // 排出 权重数组

      for(let i = 0 ;i <lan.length;i++){
        // 将每个人的名字 取出来
        let name= lan[i].name;
        if(langs[name]){ //去语言包查找 查找到就返回
          res.end(langs[name]);
          return;
        }
      }
      res.end(langs[defualtLanguage]); // 默认语言
    }else{
      res.end(langs[defualtLanguage]); // 默认语言
    }
}).listen(3000);