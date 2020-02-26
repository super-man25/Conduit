import React from 'react';
import styled from 'styled-components';

import { cssConstants } from '_constants';
import { Icon, Flex } from '_components';

const StyledIcon = styled((props) => <Icon {...props} />)`
  visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  visibility: hidden;
  display: block;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled((props) => <Flex {...props} />)`
  width: 16px;
  height: 16px;
  border: 2px solid ${cssConstants.PRIMARY_BLUE};
  border-radius: 3px;
`;

const CheckboxLabel = styled.span`
  margin-left: 5px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;

  ${CheckboxContainer} {
    margin: 15px;
  }
`;

export const Checkbox = ({ label, checked, handleChange, className }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} onChange={handleChange} name={label} />
    <StyledCheckbox>
      <StyledIcon
        checked={checked}
        size={12}
        name="check"
        color={cssConstants.PRIMARY_BLUE}
      />
    </StyledCheckbox>
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);
