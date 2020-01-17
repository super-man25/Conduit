// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Icon } from './Icon';
import { Flex } from './Flex';
import { InputBase } from './Input';

const DropdownContainer = withClickAway(styled(InputBase).attrs({
  as: 'div',
})`
  cursor: pointer;
`);
DropdownContainer.displayName = 'DropdownContainer';

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100%);
  left: 0;
  width: 100%;
  z-index: 10;
  border: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.06);
  transition: 0.1s ease-in-out all;
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;
  margin-top: 5px;

  ${(props) =>
    props.show &&
    `
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `};
`;
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuOption = styled.div`
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
DropdownMenuOption.displayName = 'DropdownMenuOption';

const DropdownArrow = styled(Icon)`
  margin-left: 10px;
  flex-shrink: 0;
`;

type Props = {
  className?: string,
  options: any[],
  selected: any,
  onChange: (newSelected: any, prevSelected: any, options: any[]) => void,
  onBlur: any,
  parseOption: (option: any, options: any[]) => string,
  renderSelected: (selectedOption: any, options: any[]) => Node,
  noneSelected: string | Node,
  arrowColor?: string,
  valid: boolean,
  invalid: boolean,
};

export const Dropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemClicked = (newSelected: any) => {
    const { onChange, options, selected: prevSelected } = props;

    if (prevSelected === newSelected) {
      return;
    }

    onChange(newSelected, prevSelected, options);
  };

  const {
    className,
    selected,
    options,
    parseOption,
    noneSelected,
    renderSelected,
    arrowColor,
    valid,
    invalid,
    onBlur,
  } = props;

  const hasSelectedItem = !!options.find(
    (option) => selected && option.value === selected.value
  );

  const getArrowColor = () => {
    if (valid) return cssConstants.SECONDARY_GREEN;
    if (invalid) return cssConstants.SECONDARY_RED;
    if (arrowColor) return arrowColor;
    return cssConstants.PRIMARY_WHITE;
  };

  return (
    <DropdownContainer
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      onClickAway={() => {
        onBlur && onBlur();
        setIsOpen(false);
      }}
      valid={valid}
      invalid={invalid}
    >
      <Flex justify="space-between" align="center">
        {hasSelectedItem
          ? renderSelected
            ? renderSelected(selected, options)
            : parseOption(selected, options)
          : noneSelected}
        <DropdownArrow
          size={12}
          color={getArrowColor()}
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
        />
      </Flex>
      <DropdownMenu show={isOpen}>
        {options.map((option, index) => (
          <DropdownMenuOption
            isActive={option === selected}
            key={index}
            onClick={() => itemClicked(option)}
          >
            {parseOption(option, options)}
          </DropdownMenuOption>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
