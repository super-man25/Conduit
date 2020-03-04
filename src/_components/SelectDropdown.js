// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';

import { withClickAway } from '_hoc';
import { colors } from '_constants';
import { fadeIn } from './keyframes';
import { Icon } from '_components';
import type { Option } from '_helpers/types';

const DropdownContainer: ComponentType<{
  active: boolean,
}> = withClickAway(styled.div`
  display: block;
  position: relative;
  min-width: 100px;
  cursor: pointer;
  text-align: left;
  border: 1px solid ${(props) => (props.active ? colors.blue : colors.gray)};
  border-radius: 3px;
  font-size: 14px;
`);

const DropdownSelectedItem: ComponentType<{
  dropdownOpen: boolean,
}> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid
    ${(props) => (props.dropdownOpen ? colors.lightGray : 'transparent')};
`;

const DropdownIconWrapper: ComponentType<{ active: boolean }> = styled.span`
  transition: transform ease-out 0.2s;
  transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropdownMenu = styled.ul`
  position: absolute;
  left: -1px;
  background-color: ${colors.white};
  border: 1px solid ${colors.blue};
  border-top: none;
  list-style: none;
  min-width: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 10;

  animation: ${fadeIn} 0.2s ease-out;
  animation-fill-mode: forwards;
`;

const DropdownItem = styled.li`
  padding: 10px 14px;

  &:hover {
    color: #54a1d5;
    background-color: ${colors.lightGray};
  }
`;

DropdownContainer.displayName = 'DropdownContainer';
DropdownSelectedItem.displayName = 'DropdownSelectedItem';
DropdownIconWrapper.displayName = 'DropdownIconWrapper';
DropdownMenu.displayName = 'DropdownMenu';
DropdownItem.displayName = 'DropdownItem';

type Props = {
  options: Option[],
  selected: Option,
  selectedValue?: any,
  onChange: (option: Option) => void,
  placeholder: string,
};

type State = {
  isOpen: boolean,
};

export class SelectDropdown extends React.Component<Props, State> {
  state = {
    isOpen: false,
  };

  static defaultProps = {
    onChange: () => {},
    placeholder: 'Select',
  };

  handleClickAway = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  triggerOnChange = (option: Option) => {
    const { onChange, selected } = this.props;

    if (option !== selected) {
      onChange(option);
    }

    this.toggleIsOpen();
  };

  render() {
    const { options, selected, placeholder } = this.props;
    const { isOpen } = this.state;

    return (
      <DropdownContainer onClickAway={this.handleClickAway} active={isOpen}>
        <DropdownSelectedItem onClick={this.toggleIsOpen} dropdownOpen={isOpen}>
          <span>{selected ? selected.label : placeholder}</span>
          <DropdownIconWrapper active={isOpen}>
            <Icon size={12} name="arrowDown" />
          </DropdownIconWrapper>
        </DropdownSelectedItem>
        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => this.triggerOnChange(option)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    );
  }
}
