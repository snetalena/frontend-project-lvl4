import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { asyncChannelsActions } from '../../slices';


const RemoveChannel = (props) => {
  const modalData = useSelector((state) => state.modals.modalData);
  const dispatch = useDispatch();
  const { closeModal } = props;

  const handleOnRemoveChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(asyncChannelsActions.removeChannel(id));
    dispatch(closeModal());
  };
  const { id, name } = modalData;
  const question = `Delete channel: ${name}?`;
  return (
    <Modal show onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{question}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleOnRemoveChannel(id)} variant="outline-primary" type="submit">Ok</Button>
        <Button onClick={() => dispatch(closeModal())} variant="outline-secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
