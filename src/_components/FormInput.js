import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import get from 'lodash.get';

import { colors } from '_constants';
import { InputLabel, Input } from './Input';

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldError = styled.div`
  font-size: 12px;
  color: ${colors.red};
  margin-top: 5px;
`;

const renderInput = ({ form, field, placeholder, children }) => {
  const fieldError = get(form.errors, field.name); // using get() because name can be an object path string
  const fieldTouched = get(form.touched, field.name);

  return (
    <>
      {children ? (
        children({ field, form })
      ) : (
        <Input
          valid={!fieldError && fieldTouched}
          invalid={fieldError && fieldTouched}
          placeholder={placeholder}
          {...field}
        />
      )}
      {fieldError && fieldTouched && <FieldError>{fieldError}</FieldError>}
    </>
  );
};

export const FormInput = ({
  label,
  name,
  validate,
  children,
  valid,
  invalid,
  placeholder,
}) => {
  return (
    <StyledFormInput>
      <InputLabel>{label}</InputLabel>
      <Field
        validate={(value) => validate(value)}
        name={name}
        placeholder={placeholder}
      >
        {({ form, field }) =>
          renderInput({ form, field, placeholder, children })
        }
      </Field>
    </StyledFormInput>
  );
};
