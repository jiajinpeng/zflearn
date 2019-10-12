import React from 'react';
import ReactDOM from 'react-dom';


class Control extends React.Component{
  state = {
    a:'hello',
    b:'world'
  }
  changeHandler = (e)=>{
    let val = e.target.name
    this.setState({
      [val]:e.target.value
    })
  }
  render(){
    return (
      <div>
        <input type="text" name="a" value={this.state.a} onChange={this.changeHandler}/>
        <input type="text" name="b" value={this.state.b} onChange={this.changeHandler}/>
        {this.state.a}
        {this.state.b}
      </div>
    )
  }
} 
ReactDOM.render(<Control></Control>,window.root);
