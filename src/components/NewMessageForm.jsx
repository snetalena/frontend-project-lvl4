import React, { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';
import { FormGroup, FormControl, Alert } from 'react-bootstrap';
import UserContext from '../Context.js';
import { asyncMessagesActions, errorsActions } from '../slices';

const NewMessageForm = () => {
  const userName = useContext(UserContext);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const errors = useSelector((state) => state.errors);

  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handlerOnSubmit = async (values, { resetForm, setSubmitting }) => {
    const messageData = { data: { attributes: { text: values.text, userName } } };
    try {
      await dispatch(asyncMessagesActions.addMessage(messageData, currentChannelId));
      setSubmitting(false);
      resetForm();
    } catch (error) {
      dispatch(errorsActions.addError(error.message));
    }
  };

  const renderError = () => {
    if (_.isEqual(errors, {})) {
      return null;
    }
    return (
      <Alert variant="danger" onClose={() => dispatch(errorsActions.cleanError())} dismissible>
        <Alert.Heading>{errors.message}</Alert.Heading>
        <p>
          Please, try do it later!
        </p>
      </Alert>
    );
  };

  const formik = (formikProps) => (
    <form onSubmit={formikProps.handleSubmit}>
      {renderError()}
      <FormGroup>
        <FormControl
          required
          type="text"
          name="text"
          ref={inputRef}
          onChange={formikProps.handleChange}
          disabled={formikProps.isSubmitting}
          placeholder="Input a new message"
          value={formikProps.values.text}
        />
      </FormGroup>
    </form>
  );

  return (
    <div className="mt-auto">
      <Formik initialValues={{ text: '' }} onSubmit={handlerOnSubmit}>
        {formik}
      </Formik>
    </div>
  );
};

export default NewMessageForm;
