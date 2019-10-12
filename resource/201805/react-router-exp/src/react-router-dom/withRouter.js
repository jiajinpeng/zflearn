import React from 'react';
import Route from './Route'
let withRouter = (Component) =>{
  return ()=>{
    return <Route component={Component}></Route>
  }
}

export default withRouter;