import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  console.log('state mapStateToProps ', state);
  const { byId, allIds, currentChannelId } = state.channels;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  selectActiveChannel: actions.selectActiveChannel,
};

class Channels extends React.Component {

  handleOnClickChannel = (id) => () => {
    const { selectActiveChannel } = this.props;
    selectActiveChannel({ id });
  }

  renderChannel = (channel) => {
    const { currentChannelId } = this.props;
    console.log('currentChannelId ', currentChannelId);
    const btnChannelClasses = cn({
      'nav-link btn btn-block': true,
      active: currentChannelId === channel.id,
    });

    return (
      <li key={channel.id} className="nav-item">
        <button onClick={this.handleOnClickChannel(channel.id)} type="button" className={btnChannelClasses}>{channel.name}</button>
      </li>
    );
  }

  render() {
    console.log('props ', this.props);
    const { channels } = this.props;
    // if (channels.length === 0) {
    //   return null;
    // }

    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto">+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
