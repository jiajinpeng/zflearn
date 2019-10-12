import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Counter extends Component {
  static defaultProps = { 
    a: 1
  }
  state = {
    num: 0
  }
  constructor(props) {
    console.log('parent-constructor')
    super();
  }
  shouldComponentUpdate(){ 
    console.log('parent shouldComponentUpdate');
    return true
  }
  getSnapshotBeforeUpdate(){
    console.log('parent-componentWillUpdate');
    return 100
  }
  componentDidUpdate(newProps,newState,z) {
    console.log(z)
    console.log('parent-componentDidUpdate');
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 0 });
  }
  render() {
    console.log('parent-render');
    return <div>
      <button onClick={this.handleClick}>+</button> 
      {this.state.num}
      <ChildCounter n={this.state.num}></ChildCounter>
      </div>
  }
  componentDidMount() {
    console.log('parent-didmount');
  }
  componentWillUnmount() {
    console.log('parent-组件卸载')
  }
}
class ChildCounter extends Component{
  state = {a:0}
  render(){ 
    console.log('child-render');
    return <div>child counter {this.state.a}</div>
  }
  componentDidMount() {
    console.log('child-componentDidMount')
  }
  shouldComponentUpdate(){
    return true
  }
  // 可以直接调用 并且不需要再写setState
  static getDerivedStateFromProps(newProps){ 
    console.log(newProps)
    return {m:2}
  }
}
ReactDOM.render(<Counter></Counter>, window.root);

// 
// componentWillMount 对
// render 对
// componentDidMount 对
// shouldComponentUpdate 优化
// componentWillUpdate 用不到
// componentDidUpdate 用不到
// componentWillReceiveProps 偶尔用到
// componentWillUnmount 解绑事件 可能会用到