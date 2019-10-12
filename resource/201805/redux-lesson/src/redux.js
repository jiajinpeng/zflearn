function createStore(reducer) {
  let state;
  let listeners = [];
  let dispatch = (action) => {
    state = reducer(state,action);
    listeners.forEach(fn=>fn());
  }
  dispatch({type:'@INIT'});
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
export  {createStore,bindActionCreators,combineReducers}