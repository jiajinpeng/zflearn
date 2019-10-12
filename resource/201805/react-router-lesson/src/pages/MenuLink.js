import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
// render prompt (基本用到 confirm)
// 因为我要判断当前路径有没有匹配到 通过Route渲染出来的 match 给li加个
export default class MenuLink extends Component {
  render() {
    return (<Route path={this.props.to} children={({match})=>{
      return <li className={match?"active":""}>
           <Link to={this.props.to}>{this.props.children}</Link>
      </li>
    }}></Route>)
  }
}

// 写react基础 / 路由 前端路由 vue路由的实现
// 周日 上午router原理  redux 应用源码 周六 晚上