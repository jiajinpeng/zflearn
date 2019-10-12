let reduxLogger = (store)=>(dispatch)=>(action)=>{
  // 这里的dispatch是真正的dispatch方法。可以帮我们派发动作
  console.log('prev',store.getState());
  dispatch(action)
  console.log('next',store.getState());
}
let applyMiddleware = (middleware)=> (createStore)=> (reducer)=>{
  let store = createStore(reducer);
  let fn = middleware(store);
  let newDispatch = fn(store.dispatch);
  return {...store,dispatch:newDispatch};
}
// 典型的柯里化  把多个middleware连起来
export default applyMiddleware(reduxLogger)(createStore)(reducer);