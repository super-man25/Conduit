// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { withClickAway } from '_hoc';
import { colors } from '_constants';
import { darken } from 'polished';
import { Icon } from '_components/Icon';
import { Flex } from '_components/Flex';
import { DropdownFilterInput, DropdownFilterInputContainer } from './styled';

const DropdownContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
`);
DropdownContainer.displayName = 'DropdownContainer';

const DropdownMenu = styled.div`
  position: absolute;
  width: 200px;
  top: calc(100% + 8px);
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 10;
  border: 1px solid ${colors.lightGray};
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

export const Option = styled.div`
  padding: 12px 16px;
  background-color: ${(props) =>
    props.isActive ? darken(0.05, colors.white) : colors.white};
  transition: 0.1s ease-in-out all;
  color: ${colors.black};
  white-space: normal;

  :not(:last-child) {
    border-bottom: 1px solid ${colors.lightGray};
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${darken(0.05, colors.white)};
  }
`;
Option.displayName = 'Option';

type Props = {
  parseOption: (option: any, options: any[]) => string,
  renderSelected: (selectedOption: any, options: any[]) => React.Node,
  selected: any,
  options: any[],
  hasNone: boolean,
  noneSelected: string | React.Node,
  gridProps: any,
  onChange: (newSelected: any, prevSelected: any, options: any[]) => void,
};

type State = {
  isOpen: boolean,
  filterText: string,
};

export class Dropdown extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>();
  static defaultProps = {
    noneSelected: 'Select an Item',
  };

  state = {
    isOpen: false,
    filterText: '',
  };

  toggleDropdownOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  itemClicked = (newSelected: any) => {
    const { onChange, options, selected: prevSelected } = this.props;

    if (prevSelected === newSelected) {
      return;
    }

    onChange(newSelected, prevSelected, options);
  };

  getDropdownHeight = () => {
    if (!this.ref.current) return {};

    const { height, headerHeight } = this.props.gridProps;
    const { bottom } = this.ref.current.getBoundingClientRect();

    const getDropdownHeight = height + headerHeight - bottom;

    return `${getDropdownHeight}px`;
  };

  openDropdown = () => {
    if (this.state.isOpen) return;
    this.setState({ isOpen: true });
  };

  closeDropdown = () => this.setState({ isOpen: false });

  render() {
    const {
      selected,
      options,
      hasNone,
      parseOption,
      noneSelected,
      renderSelected,
    } = this.props;
    const { isOpen, filterText } = this.state;

    const hasSelectedItem = !!options.find(
      (option) => option.id === selected.id
    );

    const filteredOptions = options.filter(
      (option) =>
        option.id === filterText ||
        option.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <DropdownContainer
        onClick={this.openDropdown}
        onClickAway={() => this.setState({ isOpen: false })}
      >
        <Flex justify="space-between" align="center" width="100%">
          {hasSelectedItem
            ? renderSelected
              ? renderSelected(selected, options)
              : parseOption(selected, options)
            : noneSelected}
          <Icon
            size={12}
            color={isOpen ? colors.blue : colors.black}
            name={'arrowDown'}
          />
        </Flex>
        <div
          ref={this.ref}
          style={{
            position: 'fixed',
            zIndex: 9,
          }}
        >
          <DropdownMenu
            show={isOpen}
            style={{ maxHeight: this.getDropdownHeight() }}
          >
            <DropdownFilterInputContainer>
              <DropdownFilterInput
                value={this.state.filterText}
                onChange={({ target: { value } }) =>
                  this.setState({ filterText: value })
                }
                placeholder="Filter..."
              />
            </DropdownFilterInputContainer>
            {!hasNone && (
              <Option
                isActive={!selected || !selected.id}
                key={-1}
                onClick={() => {
                  this.itemClicked(null);
                  this.closeDropdown();
                }}
              >
                None
              </Option>
            )}
            {filteredOptions.map((option, idx) => (
              <Option
                isActive={option.id === selected.id}
                key={idx}
                onClick={() => {
                  this.itemClicked(option.id);
                  this.closeDropdown();
                }}
              >
                {parseOption(option, options)}
              </Option>
            ))}
          </DropdownMenu>
        </div>
      </DropdownContainer>
    );
  }
}
