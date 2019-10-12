let reduxPromise = (store)=>(dispatch)=>(action)=>{
  // 判断当前action是不是一个promise，如果是promise就执行,执行的时候只会管成功的结果
  if( action.then &&typeof(action.then) == 'function'){
    return action.then(dispatch);
  }else if(action.payload && action.payload.then){
    return action.payload.then(data=>{
      dispatch({...action,payload:data}); // action type
    },err=>{
      dispatch({...action,payload:err});
      return Promise.reject(err); // 对外抛出错误
    })
  }
  return dispatch(action); 
}