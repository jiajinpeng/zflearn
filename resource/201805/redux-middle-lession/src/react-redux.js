// react-redux 库中 Provider 组件 connect 方法
// react-redux 原理 = 高阶组件 + contextApi
import React,{Component} from 'react';
import {bindActionCreators} from './redux'
// 提供store给connect调用 ， contextApi 再父级提供好
let Context = React.createContext();
class Provider extends Component{
  // this.props.store
  render(){
    return  <Context.Provider value={{store:this.props.store}}>
        {this.props.children}
      </Context.Provider>
  }
}
// connect的作用就是获取store 孙子获取提供好的store
let connect = (mapStateToProps,mapDispatchToProp)=>(Com) =>{
    return ()=>{ // 最终这个connect调用后的返回结果 也是一个组件
      // 再子组件中取出store 让connect前两个函数全部执行，把执行的后返回结果传递给原来的组件，渲染原来的组件
      // 高阶组件 组件返回组件
      class Proxy extends Component{ // 高阶组件的特点 就是把组件中公用的逻辑抽取来
        state = mapStateToProps(this.props.store.getState())
        componentWillMount(){
          this.unsub = this.props.store.subscribe(()=>{
            this.setState(mapStateToProps(this.props.store.getState()))
          })
        }
        componentWillUmount(){
          this.unsub()
        }
        render(){
          let b
          if(typeof mapDispatchToProp === 'function'){
              b = mapDispatchToProp(this.props.store.dispatch);
          }else{
            // bindActionCreators 把动作 绑成一个对象
              b = bindActionCreators(mapDispatchToProp,this.props.store.dispatch)
          }
          return <Com {...this.state} {...b}></Com>
        }
      }
      return <Context.Consumer>
       {({store})=>{
          return <Proxy store={store}></Proxy>
       }}
      </Context.Consumer>
    }
}

export  {
  Provider,
  connect
}
