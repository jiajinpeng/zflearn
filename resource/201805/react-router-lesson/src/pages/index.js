import React, { Component } from 'react'
// 专门负责导航内容的
import {Link,NavLink} from 'react-router-dom';
import Logo from './Logo';
import MenuLink from './MenuLink';
export default class Index extends Component {
  render() {
    return (
      <div>
          <div className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-heading">
                  <Logo></Logo>
                </div>
                <div className="nav navbar-nav">
                {/* 1.渲染这个组件 2.我还想知道有没有匹配到 */}
                    <MenuLink  to="/home">首页</MenuLink>
                    <MenuLink  to="/profile">个人中心</MenuLink>
                    <MenuLink  to="/user">用户列表</MenuLink>
                    <MenuLink  to="/login">登录</MenuLink>
                </div>  
              </div>
          </div>
          <div className="container">
            {this.props.children}
          </div>
      </div>
    )
  }
}
