import React, { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { asyncChannelsActions } from '../../slices';

const AddChannel = (props) => {
  const dispatch = useDispatch();
  const inputAddChannelRef = useRef();
  useEffect(() => {
    inputAddChannelRef.current.focus();
  });
  const { closeModal } = props;

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(asyncChannelsActions.addChannel(values));
    setSubmitting(false);
    resetForm();
    dispatch(closeModal());
  };
  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: handleOnSubmit,
  });
  return (
    <Modal show onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputAddChannelRef}
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
        <Button onClick={() => dispatch(closeModal())} variant="outline-secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
