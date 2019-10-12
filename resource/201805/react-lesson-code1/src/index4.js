import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom'

// Component这个类中拥有一个方法叫setState 设置状态，每次调用这个方法 就会造成组件刷新
class Clock extends Component {
  state = {
    time: new Date().toLocaleString(),
    a: '呵呵'
  }
  componentDidMount() { // mounted
    this.timer = setInterval(() => {
      // 只会覆盖以前的属性 Object.assign()
      this.setState({ time: new Date().toLocaleString() })
    }, 1000)
  }
  handleClick = () => {
    ReactDOM.unmountComponentAtNode(window.root)
  }
  componentWillUnmount() { // 解绑事件和方法
    clearInterval(this.timer)
  }
  render() { // 默认渲染这个组件会调用render方法
    // 绑定this的方式 1:通过箭头函数 2:bind绑定this 3.通过es7中的箭头函数绑定this
    console.log('render')
    return <div>
      {this.state.a} <span>{this.state.time}</span>
      <button onClick={this.handleClick}>删除</button>
    </div>
  }
}
render(<Clock />, window.root);