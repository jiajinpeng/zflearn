// 根组件 里面可以渲染n个页面级组件

import React, { Component } from 'react'
import Home from './pages/Home.js'
import Profile from './pages/Profile.js'
import User from './pages/User.js'
import Login from './pages/Login.js'
import {HashRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
// 最外层要包一个路由容器
// 负责路由的
import Index from './pages/index.js';
import Protected from './pages/Protected'
// react路由渲染有三种方式component children默认不匹配也会执行
export default class App extends Component {
  render() {
    return (
      <Router>
       <Index>
          {/* Switch组件 */}
          <Switch>
            {/*  exact={true} 代表的是严格匹配 */}
            <Route path="/home" exact={true} component={Home}/>
            <Route path="/home/123" component={Home}/>
            {/*  如果用户没有登录 应该重定向到 登录页 */}
            <Protected path="/profile" component={Profile}/>
            <Route path="/user" component={User}/>
            <Route path="/login" component={Login}/>
            {/* 重定向跳转页面 */}
            <Redirect to="/home"/>
          </Switch>
       </Index>
      </Router>
    )
  }
}
