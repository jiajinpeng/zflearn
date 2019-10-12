import React from 'react';
import { render } from 'react-dom'

// 什么叫组件 组件是干什么的？
// 组件目的就是1.复用  2.方便维护 3.提高工作效率
// react声明组件的方式 函数声明 类声明
// 组件特点就是首字母大写
// 1.缺点是 没有this 2.没有状态 3.没有声明周期 
// function Build(props) {
//   let {title,content} = props;
//   return (
//     <div>
//       <div>{title}</div>
//       <div>{content}</div>
//     </div>
//   )
// }

// render(<div>
//   <Build title="2" content="1xx"></Build>
//   <Build title="1" content="1xx"></Build>
//   <Build title="1" content="1xx"></Build>
// </div>, window.root);


// render是有优化机制的 只更新数据有变化的
function Clock(props) {
  return <div> 呵呵：<span>{props.time}</span></div>
}
setInterval(()=>{
  render(<Clock time={new Date().toLocaleString()} />, window.root);
},1000)