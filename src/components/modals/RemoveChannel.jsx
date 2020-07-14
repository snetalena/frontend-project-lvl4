import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveChannel = (props) => {
  const { modalProps: { removeChannel, closeModal, modalData } } = props;
  const handleOnRemoveChannel = (id) => (e) => {
    e.preventDefault();
    removeChannel(id);
    closeModal();
  };
  const { id, name } = modalData;
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

export default RemoveChannel;
