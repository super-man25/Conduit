// @flow
import * as React from 'react';
import { Text, Flex, Icon } from '_components';
import { cssConstants } from '_constants';
import {
  MultiSelectContainer,
  MultiSelectMenu,
  SplitButtonContainer,
  SplitButtonHalf
} from './styled';

import { MultiSelectGroupView } from './MultiSelectGroupView';
import { MultiSelectView } from './MultiSelectView';

export type Option = {
  id: number
};

type State = {
  isOpen: boolean,
  selectAllNext: boolean,
  isGrouped: boolean
};

type Props = {
  options: any[],
  selected: any[],
  labelFn: (option: any) => string,
  toggleSelectAll: (selectAllNext: boolean) => void,
  label: string,
  cellLabel: string,
  gridProps: any,
  rows?: any,
  isGroupable: boolean,
  columnData: any,
  updatePriceRuleProperty: (option: any[]) => void,
  onItemClicked: (option: any) => void
};

type GroupedSplitButtonProps = {
  isGrouped: boolean,
  selectGrouping: (grouped: boolean) => void
};

export function GroupedSplitButton({
  isGrouped,
  selectGrouping
}: GroupedSplitButtonProps) {
  return (
    <SplitButtonContainer>
      <SplitButtonHalf
        isActive={!isGrouped}
        onClick={() => selectGrouping(false)}
      >
        Uncategorized
      </SplitButtonHalf>
      <SplitButtonHalf
        isActive={isGrouped}
        onClick={() => selectGrouping(true)}
      >
        By Category
      </SplitButtonHalf>
    </SplitButtonContainer>
  );
}

export class MultiSelect extends React.Component<Props, State> {
  state = { isOpen: false, selectAllNext: true, isGrouped: false };
  ref = React.createRef<HTMLDivElement>();

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

  selectGrouping = (isGrouped: boolean) => {
    this.setState({ isGrouped });
  };

  render() {
    const { isOpen, selectAllNext } = this.state;
    const {
      cellLabel,
      label,
      selected,
      options,
      isGroupable,
      columnData,
      labelFn,
      onItemClicked,
      updatePriceRuleProperty
    } = this.props;

    let OptionsView;
    if (isGroupable && this.state.isGrouped) {
      const {
        grouping: { categoriesKey, groupedKey }
      } = columnData;
      OptionsView = (
        <MultiSelectGroupView
          categories={columnData[categoriesKey]}
          grouped={columnData[groupedKey]}
          selected={selected}
          labelFn={labelFn}
          updatePriceRuleProperty={updatePriceRuleProperty}
          onItemClicked={onItemClicked}
        />
      );
    } else {
      OptionsView = (
        <MultiSelectView
          options={options}
          selected={selected}
          labelFn={labelFn}
          onItemClicked={onItemClicked}
        />
      );
    }

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
              flexWrap="wrap"
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

              {isGroupable && (
                <GroupedSplitButton
                  isGrouped={this.state.isGrouped}
                  selectGrouping={this.selectGrouping.bind(this)}
                />
              )}
            </Flex>
            {OptionsView}
          </MultiSelectMenu>
        </div>
      </MultiSelectContainer>
    );
  }
}
