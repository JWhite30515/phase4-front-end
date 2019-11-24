import * as React from 'react';

import thunk from  'redux-thunk';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';

import { initialState } from './redux/state/RootState';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const rootEl = document.getElementById('root');

render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  rootEl,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
