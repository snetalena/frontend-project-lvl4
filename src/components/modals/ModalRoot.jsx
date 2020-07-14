import React from 'react';
import { connect } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import { asyncChannelsActions, modalActions } from '../../slices';

const modals = {
  ADD_CHANNEL: AddChannel,
  REMOVE_CHANNEL: RemoveChannel,
  RENAME_CHANNEL: RenameChannel,
};

const actionCreators = {
  removeChannel: asyncChannelsActions.removeChannel,
  renameChannel: asyncChannelsActions.renameChannel,
  addChannel: asyncChannelsActions.addChannel,
  closeModal: modalActions.closeModal,
};

const mapStateToProps = (state) => {
  const { modalType, modalData } = state.modals;
  return { modalType, modalData };
};

const ModalRoot = (props) => {
  const { modalType } = props;
  if (!modalType) {
    return null;
  }
  const Modal = modals[modalType];
  return <Modal modalProps={props} />;
};

export default connect(mapStateToProps, actionCreators)(ModalRoot);
