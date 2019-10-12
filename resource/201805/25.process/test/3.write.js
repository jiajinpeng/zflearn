let fs = require('fs');


setInterval(()=>{
    fs.appendFile('1.txt',1);
},1000);


