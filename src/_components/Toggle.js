import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 35px;
  user-select: none;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    cursor: not-allowed;
    opacity: 0.25;
  `}
`;

const ToggleBackground = styled.div`
  background-color: ${({ isChecked }) =>
    isChecked ? colors.blue : colors.gray};
  height: 8px;
  border-radius: 5px;
  width: 100%;
`;

const ToggleIndicator = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background-color: ${colors.white};
  border: 1px solid ${colors.blue};
  position: absolute;

  ${({ isChecked }) => (isChecked ? `right: 0;` : `left: 0;`)}
`;

export const Toggle = ({
  isCheckedDefault = true,
  handleChange,
  isDisabled,
}) => {
  const [isChecked, setIsChecked] = useState(isCheckedDefault);
  const handleClick = () => {
    if (isDisabled) return;
    setIsChecked(!isChecked);
    handleChange(!isChecked);
  };

  return (
    <StyledToggle onClick={handleClick} isDisabled={isDisabled}>
      <ToggleBackground isChecked={isChecked} />
      <ToggleIndicator isChecked={isChecked} />
    </StyledToggle>
  );
};
