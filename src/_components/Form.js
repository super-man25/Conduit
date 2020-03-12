import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Form = ({ initialValues, handleSubmit, children }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <StyledForm
          onSubmit={props.handleSubmit}
          onReset={props.handleReset}
          {...props}
        >
          {children(props)}
        </StyledForm>
      )}
    </Formik>
  );
};
