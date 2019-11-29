import * as React from 'react';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import { initialState } from './redux/state/RootState';

import 'react-toastify/dist/ReactToastify.css';
import './css/index.css';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const rootEl = document.getElementById('root');

render(
  (
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  ),
  rootEl,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
