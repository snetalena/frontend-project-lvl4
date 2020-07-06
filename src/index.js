// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import thunk from 'redux-thunk';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { createStore, applyMiddleware, compose } from 'redux';
// import React from 'react';
import reducers from './reducers/index.js';
import * as actions from './actions/index.js';
import renderDom from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon ', gon);

/* eslint-disable no-underscore-dangle */
// @ts-ignore
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

// store.dispatch(actions.getChannelsData(gon.channels));
store.dispatch(actions.initState(gon));

const socket = io();
const userName = faker.fake('{{name.lastName}} {{name.firstName}}');
cookies.set('userName', userName);

socket.on('newMessage', (message) => {
  const { data } = message;
  store.dispatch(actions.addMessageToState(data));
});
socket.on('newChannel', (channel) => store.dispatch(actions.addChannelSuccess(channel)));
socket.on('removeChannel', (channel) => store.dispatch(actions.removeChannelSuccess(channel)));
socket.on('renameChannel', (channel) => store.dispatch(actions.renameChannelSuccess(channel)));

renderDom(store, userName);
