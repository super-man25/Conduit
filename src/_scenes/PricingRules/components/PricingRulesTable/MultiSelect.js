// @flow
import * as React from 'react';
import { Text, Flex, Icon } from '_components';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { cssConstants } from '_constants';
import { withClickAway } from '_hoc';
import { Checkbox } from './styled';

export type Option = {
  id: number
};

const MultiSelectContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;
`);

const MultiSelectMenu = styled.div`
  position: absolute;
  width: 250px;
  top: calc(100% + 8px);
  max-height: 350px;
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
    `}
`;

const MultiSelectOption = styled.div`
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

type State = {
  isOpen: boolean,
  selectAllNext: boolean
};

type Props = {
  options: any[],
  labelFn: (item: Option) => string,
  selected: any[],
  onItemClicked: (item: Option) => void,
  toggleSelectAll: (selectAllNext: boolean) => void,
  label: string,
  cellLabel: string,
  gridProps: any
};

export class MultiSelect extends React.Component<Props, State> {
  state = { isOpen: false, selectAllNext: true };
  ref = React.createRef();

  componentDidMount() {
    if (this.props.options.length === this.props.selected.length) {
      this.setState({ selectAllNext: false });
    }
  }

  toggleDropdownOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  openDropdown = () => {
    if (this.state.isOpen) return;
    this.setState({ isOpen: true });
  };

  getMultiSelectHeight = () => {
    if (!this.ref.current) return {};

    const { height, headerHeight } = this.props.gridProps;
    const { bottom } = this.ref.current.getBoundingClientRect();

    const multiSelectHeight = height + headerHeight - bottom;

    return `${multiSelectHeight}px`;
  };

  toggleSelectAll = () => {
    const { toggleSelectAll } = this.props;
    const { selectAllNext } = this.state;

    toggleSelectAll(selectAllNext);
    this.setState({ selectAllNext: !selectAllNext });
  };

  render() {
    const { isOpen, selectAllNext } = this.state;
    const {
      options,
      selected,
      onItemClicked,
      labelFn,
      cellLabel,
      label
    } = this.props;

    return (
      <MultiSelectContainer
        onClick={this.openDropdown}
        onClickAway={() => this.setState({ isOpen: false })}
      >
        <Flex justify="space-between" align="center">
          {cellLabel}
          <Icon
            color={
              isOpen
                ? cssConstants.PRIMARY_LIGHT_BLUE
                : cssConstants.PRIMARY_LIGHT_BLACK
            }
            name={'arrow-drop-down'}
            size={24}
          />
        </Flex>
        <div
          ref={this.ref}
          style={{
            position: 'fixed',
            zIndex: 9
          }}
        >
          <MultiSelectMenu
            show={isOpen}
            style={{ maxHeight: this.getMultiSelectHeight() }}
          >
            <Flex
              align="center"
              justify="space-between"
              padding="1rem"
              style={{ backgroundColor: cssConstants.PRIMARY_WHITE }}
            >
              <Text size={13} weight={600}>
                {label}
              </Text>
              <Text
                color={cssConstants.PRIMARY_LIGHT_BLUE}
                style={{ cursor: 'pointer' }}
                onClick={() => this.toggleSelectAll()}
              >
                {selectAllNext ? 'Select All' : 'Select None'}
              </Text>
            </Flex>
            {options.map((option, idx) => (
              <MultiSelectOption
                isActive={selected.includes(option.id)}
                key={idx}
                onClick={() => onItemClicked(option)}
              >
                <Flex align="center">
                  <Checkbox
                    checked={selected.includes(option.id)}
                    onChange={() => onItemClicked(option)}
                  />
                  {labelFn(option)}
                </Flex>
              </MultiSelectOption>
            ))}
          </MultiSelectMenu>
        </div>
      </MultiSelectContainer>
    );
  }
}
