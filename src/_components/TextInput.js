import React, { useState } from 'react';
import styled from 'styled-components';

import { InputBase } from './Input';

const StyledTextInput = styled(InputBase)`
  width: 100%;
`;

export const TextInput = ({ handleChange, plain, ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const handleValueChange = (event) => setInputValue(event.target.value);
  const handleBlur = (event) => {
    handleChange(event.target.value);
  };

  return (
    <StyledTextInput
      value={inputValue}
      onChange={handleValueChange}
      plain={plain}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
