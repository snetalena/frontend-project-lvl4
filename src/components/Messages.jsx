import React from 'react';
import { connect } from 'react-redux';
import NewMessageForm from './NewMessageForm.jsx';

const mapStateToProps = (state) => {
  console.log('messages mapStateToProps state = ', state);
  const { currentChannelId } = state.channels;
  const messages = state.messages.filter((message) => message.channelId === currentChannelId);
  return { messages, currentChannelId };
};

class Messages extends React.Component {
  renderMessage = (message) => (
    <div key={message.id}>
      <b>{message.userName}</b>
      :
      {` ${message.text}`}
    </div>
  )

  render() {
    const { messages } = this.props;

    return (
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div id="messages-box" className="chat-messages overflow-auto mb-3">
            {messages.length === 0
              ? null
              : messages.map((message) => this.renderMessage(message))}
          </div>
          <NewMessageForm />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Messages);
