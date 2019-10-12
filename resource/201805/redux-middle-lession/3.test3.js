let reduxThunk = (store)=>(dispatch)=>(action)=>{
  if(typeof action === 'function'){
    return action(dispatch,store.getState); // 如果是函数将正真的dispatch传给用 用户抉择是否要派发
  }
  dispatch(action); // 直接把对象派发即可
}
