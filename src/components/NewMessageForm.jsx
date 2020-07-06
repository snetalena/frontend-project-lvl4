import axios from 'axios';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';
import UserContext from '../Context.js';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state.channels;
  const err = state.errors;
  // console.log('! err mapStateToProps ', err);
  return { currentChannelId, errors: err };
};

const NewMessageForm = (props) => {
  const userName = useContext(UserContext);

  const handlerOnSubmit = (event, { resetForm, setErrors }) => {
    axios.post(routes.channelMessagesPath(props.currentChannelId), {
      data: {
        attributes: {
          text: event.text,
          userName,
        },
      },
    })
      .then(() => resetForm({}))
      .catch((error) => {
        console.log('error ', error);
        return setErrors({ text: error });
      });
  };

  const formik = (formikProps) => {
    // const {
    //   values,
    //   isSubmitting,
    //   handleChange,
    //   handleSubmit,
    //   errors,
    // } = formikProps;

    const { errors } = props;
    // console.log('errors ', errors);
    // console.log('formikProps.errors ', formikProps.errors);

    return (
      <form onSubmit={formikProps.handleSubmit}>
        <input
          type="text"
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          value={formikProps.values.text}
          id="text"
          required
          disabled={formikProps.isSubmitting}
          placeholder="Input a new message"
          className="form-control"
        />
        <div className="d-block invalid-feedback">
          {!_.isEqual(errors, {}) && (<div className="input-feedback text-danger">{errors.message}</div>)}
        </div>
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

  // eslint-disable-next-line max-len
  // {formikProps.errors.text && (<div className="input-feedback text-danger">{formikProps.errors.text}</div>)}
};

export default connect(mapStateToProps)(NewMessageForm);
