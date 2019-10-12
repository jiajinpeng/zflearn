let app = {
  middlewares: [],
  use(fn) {
    this.middlewares.push(fn);
  }
};
app.use(function (next) {
  console.log(1);
  next();
  console.log(2);
});
app.use(function (next) {
  console.log(3);
  next()
  console.log(4);
});
app.use(function (next) {
  console.log(5);
  //next();
  console.log(6);
});
// function dispatch(index) {
//   if (index === app.middlewares.length) return;
//   let fn = app.middlewares[index];
//   fn(()=>dispatch(index+1));
// }
// redux compse 方法
// dispatch(0);
// [fn1,fn2,fn3]
// ()=>()=>fn1(fn2)(fn3)
let fn = app.middlewares.reduce((a, b) => (...args) => a(() => b(...args)));

fn()