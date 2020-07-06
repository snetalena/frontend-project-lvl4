import React from 'react';
import { connect } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const getModal = {
  ADD_CHANNEL: AddChannel,
  REMOVE_CHANNEL: RemoveChannel,
  RENAME_CHANNEL: RenameChannel,
};

const mapStateToProps = (state) => {
  const { modalType, modalData } = state.modals;
  return { modalType, modalData };
};

const ModalRoot = (modalProps) => {
  const { modalType, modalData } = modalProps;
  console.log('ModalRoot modalProps ', modalProps);
  if (!modalType) {
    return null;
  }
  const Modal = getModal[modalType];
  return <Modal modalProps={modalData} />;
};

export default connect(mapStateToProps)(ModalRoot);
