import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

export const Form = ({ initialValues, handleSubmit, children }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <FormikForm onSubmit={props.handleSubmit}>{children(props)}</FormikForm>
      )}
    </Formik>
  );
};
