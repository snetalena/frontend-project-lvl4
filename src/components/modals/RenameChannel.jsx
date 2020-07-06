import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as actions from '../../actions';

const actionCreators = {
  renameChannel: actions.renameChannel,
  closeModal: actions.closeModal,
};

const RenameChannel = (props) => {
  const { renameChannel, closeModal, modalProps } = props;

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    renameChannel(modalProps.id, values);
    setSubmitting(false);
    resetForm();
    closeModal();
  };

  const formik = useFormik({
    initialValues: {
      name: modalProps.name,
    },
    onSubmit: handleOnSubmit,
  });

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Input new channel`s name:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={formik.handleSubmit} variant="outline-primary" type="submit">Save</Button>
        <Button onClick={closeModal} variant="outline-secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actionCreators)(RenameChannel);
