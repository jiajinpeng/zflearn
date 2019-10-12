import React, { Component } from 'react'
import {Link,Route,Switch} from 'react-router-dom';
import Add from './Add';
import List from './List';
import Detail from './Detail';
export default class User extends Component {
  render() {
    return (
      <div className="row">
          <div className="col-md-3">
            <div className="nav nav-stacked">
              <li><Link to="/user/add">添加用户</Link></li>
              <li><Link to="/user/list">用户列表</Link></li>
            </div>
          </div>
          <div className="col-md-9">
          <Switch>
            <Route path="/user" exact={true} component={Add}/>
            <Route path="/user/add" component={Add}/>
            <Route path="/user/list" component={List}/>
            {/* id:1   */}
            <Route path="/user/detail/:id" component={Detail}/>
          </Switch>
          </div>
      </div>
    )
  }
}
