// md5 摘要 hmac sha256 把cookie加盐

let crypto = require('crypto'); 
let str = 'zfpx';
let base = crypto.createHash('md5').update(str).digest('base64');
console.log(base);
// 可以多次调用update方法
let base1 = crypto.createHash('md5').update('zf').update('px').digest('base64');
console.log(base1);
// ----------------------
// 必须通过密钥 才能摘要出相同的内容  cookie
let crypto = require('crypto');
let hmac = crypto.createHmac('sha256','zfpx1');
let r = hmac.update('zfpx').digest('base64');
console.log(r);