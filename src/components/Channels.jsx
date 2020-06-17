import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log('state ', state);
  return { channels: state.channels };
};

class Channels extends React.Component {
  renderChannel = (channel) => {
    return (
      <li key={channel.id}>
        <span className="mr-auto">
          {channel.name}
        </span>
      </li>
    );
  }

  render() {
    console.log('props ', this.props);
    const { channels } = this.props;
    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Channels);
