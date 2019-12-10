// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import styled, { css } from 'styled-components';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Icon } from './Icon';
import { Flex } from './Flex';

const DropdownContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;

  &:-webkit-autofill {
    animation-name: none;
    animation-fill-mode: both;
  }

  ::placeholder {
    color: ${cssConstants.PRIMARY_GRAY};
  }
`);
DropdownContainer.displayName = 'DropdownContainer';

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 8px);
  z-index: 10;
  border: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.06);

  transition: 0.1s ease-in-out all;
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `};
`;
DropdownMenu.displayName = 'DropdownMenu';

const Option = styled.div`
  padding: 12px 16px;
  background-color: ${(props) =>
    props.isActive
      ? darken(0.05, cssConstants.PRIMARY_WHITE)
      : cssConstants.PRIMARY_WHITE};
  transition: 0.1s ease-in-out all;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};

  :not(:last-child) {
    border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${darken(0.05, cssConstants.PRIMARY_WHITE)};
  }
`;
Option.displayName = 'Option';

type Props = {
  parseOption: (option: any, options: any[]) => string,
  renderSelected: (selectedOption: any, options: any[]) => Node,
  selected: any,
  options: any[],
  noneSelected: string | Node,
  onChange: (newSelected: any, prevSelected: any, options: any[]) => void,
  containerStyle?: any,
  arrowColor?: string
};

export const Dropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownOpen = () => {
    setIsOpen(!isOpen);
  };

  const itemClicked = (newSelected: any) => {
    const { onChange, options, selected: prevSelected } = props;

    if (prevSelected === newSelected) {
      return;
    }

    onChange(newSelected, prevSelected, options);
  };

  const {
    selected,
    options,
    parseOption,
    noneSelected,
    renderSelected,
    containerStyle,
    arrowColor
  } = props;

  const hasSelectedItem = !!options.find((option) => option === selected);

  return (
    <DropdownContainer
      onClick={() => toggleDropdownOpen()}
      onClickAway={() => setIsOpen(false)}
      style={containerStyle}
    >
      <Flex justify="space-between" align="center">
        {hasSelectedItem
          ? renderSelected
            ? renderSelected(selected, options)
            : parseOption(selected, options)
          : noneSelected}
        <Icon
          size={24}
          color={arrowColor ? arrowColor : cssConstants.PRIMARY_WHITE}
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
        />
      </Flex>
      <DropdownMenu show={isOpen}>
        {options.map((option, idx) => (
          <Option
            isActive={option === selected}
            key={idx}
            onClick={() => itemClicked(option)}
          >
            {parseOption(option, options)}
          </Option>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
