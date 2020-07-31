import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import faker from 'faker';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import UserContext from './Context.js';
import ModalRoot from './components/modals/ModalRoot.jsx';
import reducer, { channelsActions, messagesActions } from './slices';

export default (gon) => {
  const preloadedState = {
    channels: {
      channelsList: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messages: gon.messages,
  };

  const store = configureStore({
    reducer,
    preloadedState,
  });

  const socket = io();
  const userName = faker.fake('{{name.lastName}} {{name.firstName}}');
  cookies.set('userName', userName);

  socket.on('newMessage', (message) => {
    const { data: { attributes } } = message;
    store.dispatch(messagesActions.addMessageSuccess(attributes));
  });
  socket.on('newChannel', (channel) => {
    const { data: { attributes } } = channel;
    store.dispatch(channelsActions.addChannelSuccess(attributes));
  });
  socket.on('removeChannel', (channel) => store.dispatch(channelsActions.removeChannelSuccess(channel.data)));
  socket.on('renameChannel', (channel) => {
    const { data: { attributes } } = channel;
    store.dispatch(channelsActions.renameChannelSuccess(attributes));
  });

  render(
    <div className="h-100" id="chat">
      <div className="row h-100 pb-3">
        <Provider store={store}>
          <UserContext.Provider value={userName}>
            <Channels />
            <Messages />
            <ModalRoot />
          </UserContext.Provider>
        </Provider>
      </div>
    </div>,
    document.querySelector('.container'),
  );
};
