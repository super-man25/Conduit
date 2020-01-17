import React from 'react';
import { FieldArray } from 'formik';
import styled from 'styled-components';

import { Flex } from './Flex';

const ArrayItem = styled(Flex).attrs({
  align: 'center',
})`
  margin-bottom: 20px;
`;

const RemoveButton = styled.div`
  cursor: pointer;
  margin-left: 10px;
  padding-top: 25px;
`;

const AddNewButton = styled.div`
  margin-bottom: 25px;
  cursor: pointer;
`;

export const FormInputArray = ({ name, values, children }) => (
  <FieldArray name={name}>
    {(arrayHelpers) => (
      <>
        {values.map((value, index) => (
          <ArrayItem key={index}>
            {children({ index })}
            <RemoveButton onClick={() => arrayHelpers.remove(index)}>
              X
            </RemoveButton>
          </ArrayItem>
        ))}
        <AddNewButton
          onClick={() =>
            arrayHelpers.insert(values.length, {
              skyBoxCustomer: '',
              mapsTo: '',
            })
          }
        >
          + Add New
        </AddNewButton>
      </>
    )}
  </FieldArray>
);
