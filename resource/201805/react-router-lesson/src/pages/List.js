import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class List extends Component {
  state = {
    users:[]
  }
  componentWillMount(){
    let users = JSON.parse(localStorage.getItem('lists'))||[];
    this.setState({
      users
    })
  }
  render() {
    return (
      <table className="table table-borderd">
          <thead>
            <tr>
              <th>用户的id</th>
              <th>用户名</th>
            </tr>
         </thead>
         <tbody>
           {this.state.users.map(user=>(
            <tr key={user.id}>
             <td >{user.id}</td>
             {/* 跳转传递参数 */}
             <td><Link to={{pathname:"/user/detail/"+user.id,state:user}}>{user.username}</Link></td>
            </tr>
           ))}
           
         </tbody>
      
      </table>
    )
  }
}
