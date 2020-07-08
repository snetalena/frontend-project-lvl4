import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Trash, Pencil, PlusSquare } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import * as actions from '../actions';


const mapStateToProps = (state) => {
  // console.log('Channels state mapStateToProps ', state);
  const { byId, allIds, currentChannelId } = state.channels;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  selectActiveChannel: actions.selectActiveChannel,
  openModal: actions.openModal,
};

class Channels extends React.Component {
  handleOnClickChannel = (id) => () => {
    const { selectActiveChannel } = this.props;
    selectActiveChannel({ id });
  }

  handleOpenModal = (modalType, modalData = null) => (e) => {
    e.preventDefault();
    const { openModal } = this.props;
    openModal({ modalType, modalData });
  }

  renderChannelIcons = (channel, channelActivity) => {
    if (!channelActivity) {
      return null;
    }
    return (
      <div className="float-right align-middle">
        <Pencil onClick={this.handleOpenModal('RENAME_CHANNEL', channel)} className="ml-1" />
        {channel.removable
          ? <Trash onClick={this.handleOpenModal('REMOVE_CHANNEL', channel)} className="ml-2" />
          : null}
      </div>
    );
  }

  renderChannel = (channel) => {
    const { currentChannelId } = this.props;
    const channelActivity = currentChannelId === channel.id;
    const btnChannelClasses = cn({
      'nav-link btn btn-block': true,
      active: channelActivity,
    });

    return (
      <Nav.Item key={channel.id} as="li">
        <button onClick={this.handleOnClickChannel(channel.id)} className={btnChannelClasses} type="button">
          <div className="float-left">{channel.name}</div>
          {this.renderChannelIcons(channel, channelActivity)}
        </button>
      </Nav.Item>
    );
  }

  render() {
    // console.log('Channels render props ', this.props);
    const { channels } = this.props;
    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto">
            <PlusSquare onClick={this.handleOpenModal('ADD_CHANNEL')} className="ml-2 float-right align-middle" />
          </button>
        </div>
        <Nav as="ul" className="flex-column nav-pills" variant="nav-fill">
          {channels.map(this.renderChannel)}
        </Nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
