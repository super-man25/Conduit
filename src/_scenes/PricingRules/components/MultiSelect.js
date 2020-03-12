// @flow
import * as React from 'react';
import { Text, Flex, Icon } from '_components';
import { colors } from '_constants';
import {
  MultiSelectContainer,
  MultiSelectMenu,
  SplitButtonContainer,
  SplitButtonHalf,
  DropdownFilterInput,
  DropdownFilterInputContainer,
} from './styled';

import { MultiSelectGroupView } from './MultiSelectGroupView';
import { MultiSelectView } from './MultiSelectView';

export type Option = {
  id: number,
};

type State = {
  isOpen: boolean,
  selectAllNext: boolean,
  isGrouped: boolean,
  filterText: string,
};

type Props = {
  options: any[],
  selected: any[],
  disabled: string[],
  labelFn: (option: any) => string,
  toggleSelectAll: (selectAllNext: boolean) => void,
  label: string,
  cellLabel: string,
  gridProps: any,
  rows?: any,
  isGroupable: boolean,
  columnData: any,
  updatePriceRuleProperty: (option: any[]) => void,
  onItemClicked: (option: any) => void,
};

type GroupedSplitButtonProps = {
  isGrouped: boolean,
  selectGrouping: (grouped: boolean) => void,
};

export function GroupedSplitButton({
  isGrouped,
  selectGrouping,
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
  state = {
    isOpen: false,
    selectAllNext: true,
    isGrouped: false,
    filterText: '',
  };
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
    const { isOpen, selectAllNext, filterText } = this.state;
    const {
      cellLabel,
      label,
      selected,
      disabled,
      options,
      isGroupable,
      columnData,
      labelFn,
      onItemClicked,
      updatePriceRuleProperty,
    } = this.props;

    let OptionsView;
    if (isGroupable && this.state.isGrouped) {
      const {
        grouping: { categoriesKey, groupedKey },
      } = columnData;
      const filteredOptions = {};
      Object.keys(columnData[groupedKey]).map(
        (key) =>
          (filteredOptions[key] = columnData[groupedKey][key].filter(
            (option) => {
              return (
                option.id === filterText ||
                option.name.toLowerCase().includes(filterText.toLowerCase())
              );
            }
          ))
      );
      const filteredCategories = columnData[categoriesKey].filter(
        (category) => filteredOptions[category.id].length > 0
      );
      OptionsView = (
        <MultiSelectGroupView
          categories={filteredCategories}
          grouped={filteredOptions}
          selected={selected}
          labelFn={labelFn}
          updatePriceRuleProperty={updatePriceRuleProperty}
          onItemClicked={onItemClicked}
        />
      );
    } else {
      const filteredOptions = filterText
        ? options.filter((option) => {
            if (columnData.optionsKey === 'buyerTypes') {
              return (
                option.id === filterText ||
                option.publicDescription.toLowerCase().includes(filterText) ||
                option.code.toLowerCase().includes(filterText.toLowerCase())
              );
            } else if (columnData.optionsKey === 'priceScales') {
              return (
                option.id === filterText ||
                option.name.toLowerCase().includes(filterText.toLowerCase())
              );
            } else if (columnData.optionsKey === 'events') {
              return (
                option.id === filterText ||
                option.name.toLowerCase().includes(filterText.toLowerCase())
              );
            }
            return true;
          })
        : options;
      OptionsView = (
        <MultiSelectView
          options={filteredOptions}
          selected={selected}
          disabled={disabled}
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
        {cellLabel}
        <Icon
          color={isOpen ? colors.blue : colors.black}
          name={'arrowDown'}
          size={12}
        />
        <div
          ref={this.ref}
          style={{
            position: 'fixed',
            zIndex: 9,
          }}
        >
          <MultiSelectMenu
            show={isOpen}
            style={{ maxHeight: this.getMultiSelectHeight() }}
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
            <Flex
              align="center"
              justify="space-between"
              padding="1rem"
              flexWrap="wrap"
              style={{ backgroundColor: colors.white }}
            >
              <Text size={13} weight={600}>
                {label}
              </Text>
              <Text
                color={colors.blue}
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
