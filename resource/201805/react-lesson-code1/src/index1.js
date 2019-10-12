// react 好处api少  vue 大量api

// redux 
// React ReactDOM 负责渲染的
//  import React from 'react';
// import ReactDOM from 'react-dom';

// react 特点是语法 jsx javascript + xml
// let React  = {
//   createElement(){

//   }
// }
// 虚拟dom 虚拟dom就是用对象描述解构
// let h1 = <h1 name="zfpx">hello world</h1>
// console.log(h1);
// ReactDOM.render(h1,window.root);

let React ={
  createElement(type,props,...children){
    return {type,props,children} // vnode
  }
}
let el = <h1 name="zfpx">hello <span>world</span></h1>
function render(vnode,container) {
  if (typeof vnode === 'string') return container.appendChild(document.createTextNode(vnode))
  let { type, props, children } = vnode;
  let tag = document.createElement(type);
  for(let key in props){
    tag.setAttribute(key,props[key]);
  }
  children.forEach(child => {
    render(child,tag);
  });    // ['hello ',{type,props,children}]
  container.appendChild(tag);
}
render(el,window.root);