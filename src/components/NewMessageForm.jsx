import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';
import { FormGroup, FormControl, Alert } from 'react-bootstrap';
import UserContext from '../Context.js';
import * as actions from '../actions';

const actionCreators = {
  addMessage: actions.addMessage,
  cleanErrors: actions.cleanErrors,
};

const mapStateToProps = (state) => {
  const { currentChannelId } = state.channels;
  const { errors } = state;
  // console.log('! err mapStateToProps ', err);
  return { currentChannelId, errors };
};

const NewMessageForm = (props) => {
  const userName = useContext(UserContext);
  const {
    errors,
    currentChannelId,
    addMessage,
    cleanErrors,
  } = props;

  const handlerOnSubmit = (values, { resetForm, setSubmitting }) => {
    addMessage(currentChannelId, values.text, userName);
    setSubmitting(false);
    resetForm();
  };

  const formik = (formikProps) => {
    const renderError = () => {
      if (_.isEqual(errors, {})) {
        return null;
      }
      const errorDescription = `${errors.error}. Please, try do it later!`;
      return (
        <Alert variant="danger" onClose={() => cleanErrors()} dismissible>
          <Alert.Heading>{errors.message}</Alert.Heading>
          <p>
            {errorDescription}
          </p>
        </Alert>
      );
    };

    return (
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
  };

  return (
    <div className="mt-auto">
      <Formik initialValues={{ text: '' }} onSubmit={handlerOnSubmit}>
        {formik}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
