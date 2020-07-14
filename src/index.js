import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import renderDom from './index.jsx';
import reducer, { channelsActions, messagesActions } from './slices';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon ', gon);

const store = configureStore({
  reducer,
});

store.dispatch(channelsActions.initState(gon));

const socket = io();
const userName = faker.fake('{{name.lastName}} {{name.firstName}}');
cookies.set('userName', userName);

socket.on('newMessage', (message) => {
  const { data } = message;
  store.dispatch(messagesActions.addMessageSuccess(data));
});
socket.on('newChannel', (channel) => store.dispatch(channelsActions.addChannelSuccess(channel)));
socket.on('removeChannel', (channel) => store.dispatch(channelsActions.removeChannelSuccess(channel)));
socket.on('renameChannel', (channel) => store.dispatch(channelsActions.renameChannelSuccess(channel)));

renderDom(store, userName);
