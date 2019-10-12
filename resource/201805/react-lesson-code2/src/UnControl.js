// 受控组件 非受控组件
// 输入框获取值：非受控组件:操作dom，很方便
// 受控组件 受状态控制 很快的进行校验 默认值操作
import React,{Component} from 'react';
import {render} from 'react-dom';
// react一般都是操作数据
// 16.3的api React.createRef()
// 1.方便 2.可以和一些地三方库结合使用
class UnControl extends Component{
  b=React.createRef();
  handleClick = () =>{
    alert(this.a.value); // 写法1
    alert(this.b.current.value) // 写法2
  }
  render(){
    return (<div>
      <input type="text" id="username" ref={dom=>this.a=dom}/>
      <input type="text" id="password" ref={this.b}/>
      <button onClick={this.handleClick}>点击</button>
    </div>)
  }
}
render(<UnControl></UnControl>,window.root);



