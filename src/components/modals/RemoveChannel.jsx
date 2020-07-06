import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../../actions';

const actionCreators = {
  removeChannel: actions.removeChannel,
  closeModal: actions.closeModal,
};

const RemoveChannel = (props) => {
  console.log('RemoveChannel modalProps', props);
  const { removeChannel, closeModal, modalProps } = props;

  const handleOnRemoveChannel = (id) => (e) => {
    e.preventDefault();
    removeChannel(id);
    closeModal();
  };

  const { id, name } = modalProps;
  const question = `Delete channel: ${name}?`;

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{question}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleOnRemoveChannel(id)} variant="outline-primary" type="submit">Ok</Button>
        <Button onClick={closeModal} variant="outline-secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actionCreators)(RemoveChannel);
