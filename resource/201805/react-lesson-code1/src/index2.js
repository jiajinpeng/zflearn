import React from 'react';
import { render } from 'react-dom'


// jsx 语法 javascript + xml
// jsx 有一些不一样的属性 
// class => className
// for =>htmlFor 
// style dangerouslyInnerHTML(xss 攻击)

// jsx元素/react元素 用<号标识 看到{ 会认为里面装的是js代码
let str = '<h1>world</h1>'
let el = (
  <div>
    <h1 className="a">hello</h1><div></div>
    <label htmlFor="username">用户名</label>
    <input type="text" id="username" />
    <div style={{ color: 'red' }}>hello</div>
    {/*hello*/}
    <div dangerouslySetInnerHTML={{ __html: str }}></div>
    <div>{str}</div>
  </div>
)
// 取值表达式 可以把返回值显示到页面中 
// React.Fragment起到包裹的作用
let str1 = 'hello'
function a() { 
  return <h1>hello</h1>
}
let obj = {a:1} // 渲染成字符串才能展示
// null 和void0 功能一样
let el1 = (
  <React.Fragment>
    <div>{str1}</div>
    <div>{a()}</div>
    <div>{JSON.stringify(obj)}</div>
    <div>{false?<span>你好</span>:void 0}</div>
  </React.Fragment>
)
let arr = [1,2,3];
// 添加一个li key的要求最好不要用数组的索引 一般用id  dom-diff
let el2 = (
  arr.map((item, key) => (
    <li key={key}>{item}</li>
  ))
)

render(el2, window.root);