import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// 更新组件有两种方式 1.给组件传递新的属性 2.让组件调用setState
class Counter extends Component {
  state = {
    num: 0
  }
  handleClick = () => {
    // setState 批量更新 setState是同步还是异步
    // this.setState({ num: this.state.num + 1 },function () {
    //   this.setState({ num: this.state.num + 1 },function () {
    //     this.setState({ num: this.state.num + 1 });
    //   });
    // });
    this.setState((prevState)=>({num:prevState.num+1}));
    this.setState((prevState)=>({num:prevState.num+1}));
  }
  render() {
    return <div>
      {this.state.num}
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}
// 属性校验
ReactDOM.render(<Counter></Counter>, window.root);


// 复合组件 把组件套起来 父组件里套子组件，拆分的更细一些
// 声明周期