// 摘要算法 md5 
// 加密 可以解密

// md5 加密字符串 服务器收的 加密字符串

// 密码都用md5

// 摘要算法:不可逆 相同的内容加密出来的结果永远一样, 加密后的结果长度一致的，不同的内容摘要出来的结果永远不一样
// 123456 => xxx

let crypto = require('crypto');
let r = crypto.createHash('md5').update('123456').digest('base64');
console.log(r);
r = crypto.createHash('md5').update('1234567').digest('base64');
console.log(r);

