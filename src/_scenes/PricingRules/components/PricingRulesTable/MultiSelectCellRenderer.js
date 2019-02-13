// @flow
import * as React from 'react';
import { Text, Flex } from '_components';
import { Icon } from '_components/Icon';
import { cssConstants } from '_constants';
import { withClickAway } from '_hoc';
import { MultiSelect } from './MultiSelect';
import { PositionedBox } from './styled';
import type { Option } from './MultiSelect';

type State = {
  dropDownOpen: boolean
};

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  columnData: any,
  rulePropertyValue: number[],
  updatePriceRuleProperty: (rulePropertyValue: number[]) => void
};

export const MultiSelectWithClickAway = withClickAway(MultiSelect);

export class MultiSelectCellPresenter extends React.Component<Props, State> {
  state = { dropDownOpen: false };
  ref = React.createRef();

  toggleDropdown = () => {
    const { dropDownOpen } = this.state;

    this.setState({
      dropDownOpen: !dropDownOpen
    });
  };

  onItemClicked = (item: Option) => {
    const { rulePropertyValue, updatePriceRuleProperty } = this.props;

    const itemPreviouslySelected = rulePropertyValue.some((i) => i === item.id);

    const newlySelectedItemIds = itemPreviouslySelected
      ? rulePropertyValue.filter((o) => o !== item.id)
      : [...rulePropertyValue, item.id];

    updatePriceRuleProperty(newlySelectedItemIds);
  };

  getPositionOfFilterIcon() {
    if (!this.ref.current) return {};

    const { left, top } = this.ref.current.getBoundingClientRect();

    return {
      top: `calc(${Math.ceil(top)}px - 247px)`,
      left: `calc(${Math.ceil(left)}px - 121px)`
    };
  }

  render() {
    const { columnData, rulePropertyValue } = this.props;
    const { label, optionsKey, labelFn } = columnData;
    const items = columnData[optionsKey];

    const { dropDownOpen } = this.state;

    const selectedNumber = rulePropertyValue.length;

    // fetch selected options and concatenate their labels
    // to be used as a title on the multi select container
    const selectedTitles = items
      .filter((item) => rulePropertyValue.includes(item.id))
      .map((option) => labelFn(option))
      .reduce((acc, description) => `${acc} ${description},`, '')
      .slice(0, -1);

    if (!this.props.isEditing) {
      return (
        <Flex align="center">
          <Text title={selectedTitles}>
            {selectedNumber} {label}
          </Text>
        </Flex>
      );
    }

    return (
      <div>
        <PositionedBox position="relative">
          <Flex align="center" onClick={this.toggleDropdown}>
            {selectedNumber} {label}
            <div
              style={{ marginLeft: 7, height: 24, cursor: 'pointer' }}
              ref={this.ref}
            >
              <Icon
                color={
                  dropDownOpen
                    ? cssConstants.PRIMARY_LIGHT_BLUE
                    : cssConstants.PRIMARY_LIGHT_BLACK
                }
                name={'arrow-drop-down'}
                size={24}
              />
            </div>
          </Flex>
        </PositionedBox>
        {dropDownOpen && (
          <div
            style={{
              ...this.getPositionOfFilterIcon(),
              position: 'fixed',
              zIndex: 9
            }}
          >
            <MultiSelectWithClickAway
              onClickAway={this.toggleDropdown}
              onItemClicked={this.onItemClicked}
              items={items}
              labelFn={labelFn}
              selectedItems={rulePropertyValue}
              label={label}
            />
          </div>
        )}
      </div>
    );
  }
}
