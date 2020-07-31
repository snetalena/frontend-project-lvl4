import React from 'react';
import { useSelector } from 'react-redux';
import NewMessageForm from './NewMessageForm.jsx';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages
    .filter((message) => message.channelId === currentChannelId));

  const renderMessage = (message) => (
    <div key={message.id}>
      <b>{message.userName}</b>
      :
      {` ${message.text}`}
    </div>
  );

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.length > 0 && messages.map((message) => renderMessage(message))}
        </div>
        <NewMessageForm />
      </div>
    </div>
  );
};

export default Messages;
