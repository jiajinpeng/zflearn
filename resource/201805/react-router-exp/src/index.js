import React from 'react';
import ReactDOM,{render} from 'react-dom';
import Home from './components/Home.js';
import User from './components/User.js';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom'
import Article from './components/Article';
import Render from './components/Render';
// 先在父级BrowserRouter中记录好对应的路径 /user
// 默认情况下会那Route的path 和这个路径比 如果一样则渲染对应的组件
// contextApi
render(<Router>
  <div>
    <Link to="/">首页 </Link>
    <Link to="/user">用户</Link>
    <Switch>
      <Route path="/render" render={(props)=>{
        return <Render/> 
      }}/>
    </Switch>
  </div>
</Router>,window.root);


 // <Switch>
     
    //   <Route path="/" exact={true} component={Home}></Route>
    //   <Route path="/user" exact={true} component={User}></Route>
    //   <Route path="/article/:id" component={Article}/> */}
    //   {/* <Redirect to="/"/>
    // </Switch>