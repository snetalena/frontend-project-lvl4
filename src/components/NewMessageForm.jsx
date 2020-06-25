import axios from 'axios';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import UserContext from '../Context.js';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  console.log('! state mapStateToProps ', state);
  const { currentChannelId } = state.channels;
  return { currentChannelId };
};

const NewMessageForm = (props) => {
  const userName = useContext(UserContext);
  console.log('userName ', userName);
  console.log('props ', props);

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

    console.log('formikProps.errors ', formikProps.errors);

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
          {formikProps.errors.text && (<div className="input-feedback text-danger">{formikProps.errors.text}</div>)}
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
};

export default connect(mapStateToProps)(NewMessageForm);
