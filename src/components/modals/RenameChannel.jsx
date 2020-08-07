import React, { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { asyncChannelsActions } from '../../slices';

const RenameChannel = (props) => {
  const modalData = useSelector((state) => state.modals.modalData);
  const dispatch = useDispatch();
  const inputRenameChannelRef = useRef();
  useEffect(() => {
    inputRenameChannelRef.current.focus();
  });
  const { closeModal } = props;

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(asyncChannelsActions.renameChannel(modalData.id, values));
    setSubmitting(false);
    resetForm();
    dispatch(closeModal());
  };
  const formik = useFormik({
    initialValues: { name: modalData.name },
    onSubmit: handleOnSubmit,
  });
  return (
    <Modal show onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>Input new channel`s name:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRenameChannelRef}
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

export default RenameChannel;
