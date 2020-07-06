import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as actions from '../../actions';

const actionCreators = {
  addChannel: actions.addChannel,
  closeModal: actions.closeModal,
};

const AddChannel = (modalProps) => {
  const { addChannel, closeModal } = modalProps;

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    addChannel(values);
    setSubmitting(false);
    resetForm();
    closeModal();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleOnSubmit,
  });

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
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

export default connect(null, actionCreators)(AddChannel);
