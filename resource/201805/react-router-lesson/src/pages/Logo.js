
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class Logo extends Component {
  change = ()=>{
    // 在此方法中实现 组件的跳转
   this.props.history.push('/login')
  }
  render() {
    return (
      <div className="navbar-brand" onClick={this.change}>管理系统</div>
    )
  }
}
// 高阶组件
export default withRouter(Logo)

