function name(obj) {
  let tmpl = ''
  with (obj) {
    tmpl += `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  `
    arr.forEach(item => {
      tmpl += `
      <li>hello</li>
  `
    })
    tmpl += `
</body>
</html>`}
  return tmpl
}
let t = name({ arr: [1, 2, 3] });
console.log(t);
// 模板引擎