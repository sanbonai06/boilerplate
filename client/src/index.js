import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

//일반 store는 객체밖에 받지 못하기 때문에 redux-promise, redux-thunk를 이용해서 프로미스와 함수도 받을 수 있게 해줌. 
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) 

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window._REDUX_DEVTOOLS_EXTENSION_&&
      window._REDUX_DEVTOOLS_EXTENSION_()
      )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
