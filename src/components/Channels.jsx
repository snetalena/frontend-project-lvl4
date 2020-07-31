import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Trash, Pencil, PlusSquare } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import { channelsActions, modalActions } from '../slices';

const Channels = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();

  const handleOnClickChannel = (id) => () => {
    dispatch(channelsActions.selectActiveChannel({ id }));
  };

  const handleOpenModal = (modalType, modalData = null) => (e) => {
    e.preventDefault();
    dispatch(modalActions.openModal({ modalType, modalData }));
  };

  const renderChannelIcons = (channel, channelActivity) => {
    if (!channelActivity) {
      return null;
    }
    return (
      <div className="float-right align-middle">
        <Pencil onClick={handleOpenModal('RENAME_CHANNEL', channel)} className="ml-1" />
        {channel.removable
          ? <Trash onClick={handleOpenModal('REMOVE_CHANNEL', channel)} className="ml-2" />
          : null}
      </div>
    );
  };

  const renderChannel = (channel) => {
    const channelActivity = currentChannelId === channel.id;
    const btnChannelClasses = cn({
      'nav-link btn btn-block': true,
      active: channelActivity,
    });

    return (
      <Nav.Item key={channel.id} as="li">
        <button onClick={handleOnClickChannel(channel.id)} className={btnChannelClasses} type="button">
          <div className="float-left">{channel.name}</div>
          {renderChannelIcons(channel, channelActivity)}
        </button>
      </Nav.Item>
    );
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">
          <PlusSquare onClick={handleOpenModal('ADD_CHANNEL')} className="ml-2 float-right align-middle" />
        </button>
      </div>
      <Nav as="ul" className="flex-column nav-pills" variant="nav-fill">
        {channels.map(renderChannel)}
      </Nav>
    </div>
  );
};

export default Channels;
