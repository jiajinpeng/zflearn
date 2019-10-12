function createStore(reducer,fn) {
  let state;
  let listeners = [];
  let dispatch = (action) => {
    state = reducer(state,action);
    listeners.forEach(fn=>fn());
  }
  dispatch({type:'@INIT'});
  if(typeof fn === 'function'){ // 用了中间件,我就通过applyMiddleware这个方法来创建容器
    return fn(createStore)(reducer);
  }
  let getState = ()=> JSON.parse(JSON.stringify(state));
  let subscribe = (fn)=>{
    listeners.push(fn);
    return ()=>{
      listeners = listeners.filter(l=>l!=fn);
    }
  }
  return {getState,subscribe,dispatch}
}
function bindActionCreators(actions,dispatch){
  let obj = {}
  for(let key in actions){ // {add(){},minus(){}}
    obj[key] = (...args)=>dispatch(actions[key](...args))
  }
  return obj;
}
let combineReducers = (reducers)=>{
  // reducer需要返回一个默认的状态 （）
  return (state={},action)=>{
    let obj = {}
    for(let key in reducers){
      obj[key] = reducers[key](state[key],action)
    }
    return obj;
  }
}
let applyMiddleware = (...middlewares)=> (createStore)=> (reducer)=>{
  let store = createStore(reducer);
  let fns = middlewares.map(middleware=>{
    return middleware(store)
  });
  let newDispatch = compose(...fns)(store.dispatch);// compose(fn1,fn2)(store.dispatch)
  return {...store,dispatch:newDispatch};
}
function compose(...args){
  return args.reduce((a,b)=>((...args)=>a(b(...args))));
}
export  {createStore,
  bindActionCreators,
  combineReducers,
  compose,
  applyMiddleware
}