// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import thunk from 'redux-thunk';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
import * as actions from './actions/index.js';
import renderDom from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk)),
);

store.dispatch(actions.getChannelsData(gon.channels));
renderDom(store);
