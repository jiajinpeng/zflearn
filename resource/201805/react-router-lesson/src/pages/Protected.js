import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
export default class Protected extends Component {
  render() {
    // Protected里面有 path 有component
    let login = localStorage.getItem('login');
    // 拦截的作用
    return login?<Route {...this.props}></Route>:<Redirect to={{pathname:"/login",state:{"from":'/profile'}}}/>
  }
}
