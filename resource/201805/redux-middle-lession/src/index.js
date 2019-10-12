import React,{Component} from 'react';
import {render} from 'react-dom';
import Counter from './components/Counter';
import {Provider} from './react-redux';
import store from './store'

render(<Provider store={store}>
  <Counter></Counter>
</Provider>,window.root);