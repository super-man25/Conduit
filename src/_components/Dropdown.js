import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { useClickAway } from '_hooks';
import { colors } from '_constants';
import { Icon } from './Icon';

const StyledDropdown = styled.div`
  background-color: white;
  border: 2px solid ${colors.blue};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  user-select: none;

  ${({ plain }) =>
    plain &&
    `
    background: none;
    border: none;
    padding: 0;
  `}
`;

const DropdownArrow = styled(Icon)`
  margin-left: 15px;
`;

const StyledDropdownMenu = styled.div`
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  border: 1px solid ${colors.lightGray};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGray};
  }

  & + & {
    border-top: 1px solid ${colors.lightGray};
  }
`;

const DropdownMenu = ({ options, handleSelect, handleClickAway }) => {
  const ref = useRef();
  useClickAway({ ref, handleClickAway });

  return (
    <StyledDropdownMenu ref={ref}>
      {options.map((option, index) => (
        <Option key={index} onClick={() => handleSelect(option)}>
          {option.label}
        </Option>
      ))}
    </StyledDropdownMenu>
  );
};

export const Dropdown = ({ options, defaultOption, plain, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    if (selectedOption.label) return;
    setSelectedOption(defaultOption);
  }, [defaultOption, selectedOption.label]);

  const handleOpen = () => setIsOpen(true);
  const handleSelect = (option) => {
    handleChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleClickAway = () => {
    isOpen && setIsOpen(false);
  };

  return (
    <StyledDropdown onMouseUp={handleOpen} plain={plain}>
      {selectedOption?.label}
      <DropdownArrow
        size={10}
        color={colors.blue}
        name={isOpen ? 'arrowUp' : 'arrowDown'}
      />
      {isOpen && (
        <DropdownMenu
          options={options}
          handleSelect={handleSelect}
          handleClickAway={handleClickAway}
        />
      )}
    </StyledDropdown>
  );
};
