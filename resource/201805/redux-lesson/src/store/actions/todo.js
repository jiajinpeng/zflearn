import * as types from '../action-types';
let actions = {
  addTodo(text){
    return {type:types.ADD_TODO,text}
  }
}

export default actions;

// mobx