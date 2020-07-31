import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import { modalActions } from '../../slices';

const modals = {
  ADD_CHANNEL: AddChannel,
  REMOVE_CHANNEL: RemoveChannel,
  RENAME_CHANNEL: RenameChannel,
};

const ModalRoot = () => {
  const modalType = useSelector((state) => state.modals.modalType);

  if (!modalType) {
    return null;
  }
  const Modal = modals[modalType];
  return <Modal closeModal={modalActions.closeModal} />;
};

export default ModalRoot;
