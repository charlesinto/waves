import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Components/Route';

import './Resources/css/styles.css';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './Components/Reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore)

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}
      >
        <BrowserRouter>
          <Routes  />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;