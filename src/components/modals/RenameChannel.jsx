import React from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

const RenameChannel = (props) => {
  const { modalProps: { renameChannel, closeModal, modalData } } = props;
  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    renameChannel(modalData.id, values);
    setSubmitting(false);
    resetForm();
    closeModal();
  };
  const formik = useFormik({
    initialValues: { name: modalData.name },
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

export default RenameChannel;
