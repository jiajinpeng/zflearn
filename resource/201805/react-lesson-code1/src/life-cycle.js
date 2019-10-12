import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// React16.3 推出了新的声明周期 

class Counter extends Component {
  static defaultProps = { // 1.最早调用的
    a: 1
  }
  state = {
    num: 0
  }
  constructor(props) { // 2.构造函数
    console.log('parent-constructor')
    super();
  }
  componentWillMount() { // react16.3中标识了这个方法会被废弃掉
    console.log('parent-componentWillMount');
    // 后期有需要的话 可以放在constructor中替代掉 
  }
  shouldComponentUpdate(){ // react的性能优化 immutablejs
    console.log('parent shouldComponentUpdate');
    return true
  }
  componentWillUpdate(){
    console.log('parent-componentWillUpdate');
  }
  componentDidUpdate() {
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
  componentWillMount(){
    console.log('child-componentWillMount')
  }
  render(){ // 不能更改属性的值
    console.log('child-render');
    return <div>child counter {this.props.n}</div>
  }
  componentDidMount() {
    console.log('child-componentDidMount')
  }
  shouldComponentUpdate(){
    return false
  }
  componentWillReceiveProps(){ //第一次不执行 16.3中这个方法废弃了
    console.log('儿子接收到了新的属性');
    // 接收到某个属性后 把这个属性变成了当前组件的状态
  }
}
// 只有componentWillReceiveProps/componentWillMount/componentDidMount中可以调用setState,不应该在componentWillReceiveProps中调用setState(但是大家还是这么用)
ReactDOM.render(<Counter></Counter>, window.root);

