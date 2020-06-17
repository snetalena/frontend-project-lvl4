import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Channels from './components/Channels.jsx';

const renderDom = (store) => {
  render(
    <Provider store={store}>
      <Channels />
    </Provider>,
    document.querySelector('.container'),
  );
};

export default renderDom;
