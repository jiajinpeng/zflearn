function urlencoded() {
  return (req,res,next)=>{
    if (req.headers['content-type']==='application/x-www-form-urlencoded'){
      let arr = [];
      req.on('data',function (data) {
        arr.push(data);
      })
      req.on('end', function (data) {
        req.body = require('querystring').parse(Buffer.concat(arr).toString());
        next();
      })
    }else{
      next();
    }
  }
}
function json() {
  return (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
      let arr = [];
      req.on('data', function (data) {
        arr.push(data);
      })
      req.on('end', function (data) {
        req.body = JSON.parse(Buffer.concat(arr).toString());
        next();
      })
    } else {
      next();
    }
  }
}
module.exports.urlencoded = urlencoded
module.exports.json = json