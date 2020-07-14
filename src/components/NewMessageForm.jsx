import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';
import { FormGroup, FormControl, Alert } from 'react-bootstrap';
import UserContext from '../Context.js';
import { asyncMessagesActions, errorsActions } from '../slices';

const actionCreators = {
  addMessage: asyncMessagesActions.addMessage,
  cleanError: errorsActions.cleanError,
};

const mapStateToProps = (state) => {
  const { currentChannelId } = state.channels;
  const { errors } = state;
  return { currentChannelId, errors };
};

const NewMessageForm = (props) => {
  const userName = useContext(UserContext);
  const {
    errors,
    currentChannelId,
    addMessage,
    cleanError,
  } = props;

  const handlerOnSubmit = (values, { resetForm, setSubmitting }) => {
    addMessage(currentChannelId, values.text, userName);
    setSubmitting(false);
    resetForm();
  };

  const renderError = () => {
    if (_.isEqual(errors, {})) {
      return null;
    }
    return (
      <Alert variant="danger" onClose={() => cleanError()} dismissible>
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

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
