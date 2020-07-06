import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import UserContext from './Context.js';
import ModalRoot from './components/modals/ModalRoot.jsx';

const renderDom = (store, userName) => {
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

export default renderDom;
