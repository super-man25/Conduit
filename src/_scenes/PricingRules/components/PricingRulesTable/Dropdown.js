// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Icon } from '_components/Icon';
import { Flex } from '_components/Flex';

const DropdownContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;
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

export const Option = styled.div`
  padding: 12px 16px;
  background-color: ${(props) =>
    props.isActive
      ? darken(0.05, cssConstants.PRIMARY_WHITE)
      : cssConstants.PRIMARY_WHITE};
  transition: 0.1s ease-in-out all;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
  white-space: normal;

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
  renderSelected: (selectedOption: any, options: any[]) => React.Node,
  selected: any,
  options: any[],
  hasNone: boolean,
  noneSelected: string | React.Node,
  gridProps: any,
  onChange: (newSelected: any, prevSelected: any, options: any[]) => void
};

type State = {
  isOpen: boolean
};

export class Dropdown extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>();
  static defaultProps = {
    noneSelected: 'Select an Item'
  };

  state = {
    isOpen: false
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

  render() {
    const {
      selected,
      options,
      hasNone,
      parseOption,
      noneSelected,
      renderSelected
    } = this.props;
    const { isOpen } = this.state;

    const hasSelectedItem = !!options.find(
      (option) => option.id === selected.id
    );

    return (
      <DropdownContainer
        onClick={this.toggleDropdownOpen}
        onClickAway={() => this.setState({ isOpen: false })}
      >
        <Flex justify="space-between" align="center">
          {hasSelectedItem
            ? renderSelected
              ? renderSelected(selected, options)
              : parseOption(selected, options)
            : noneSelected}
          <Icon
            size={24}
            color={
              isOpen
                ? cssConstants.PRIMARY_LIGHT_BLUE
                : cssConstants.PRIMARY_LIGHT_BLACK
            }
            name={'arrow-drop-down'}
          />
        </Flex>
        <div
          ref={this.ref}
          style={{
            position: 'fixed',
            zIndex: 9
          }}
        >
          <DropdownMenu
            show={isOpen}
            style={{ maxHeight: this.getDropdownHeight() }}
          >
            {!hasNone && (
              <Option
                isActive={!selected || !selected.id}
                key={-1}
                onClick={() => this.itemClicked(null)}
              >
                None
              </Option>
            )}
            {options.map((option, idx) => (
              <Option
                isActive={option.id === selected.id}
                key={idx}
                onClick={() => this.itemClicked(option.id)}
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
