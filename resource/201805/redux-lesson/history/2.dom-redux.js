// 1. 会把对应的功能写成常量
import {createStore} from 'redux';
const ADD = 'ADD';
const MINUS = 'MINUS';

let initState = {number:0};
function reducer(state=initState,action) {
    switch (action.type) {
      case ADD:
        return {number:state.number+action.count};
      case MINUS:
        return {number:state.number-action.count};
    }
   return state
}
let store = createStore(reducer);
let span = document.querySelector('span');
span.innerHTML = store.getState().number;
let btn1 = document.querySelector('#increment');
let btn2 = document.querySelector('#decrement');

store.subscribe(()=>{
  span.innerHTML = store.getState().number;
})

btn1.onclick = function () {
  store.dispatch({ type: ADD,count:1});
}
btn2.onclick = function () {
  store.dispatch({ type: MINUS, count: 2 });
}