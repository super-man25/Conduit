// @flow
import * as React from 'react';
import { Text, Flex } from '_components';
import { MultiSelect } from './MultiSelect';
import type { Option } from './MultiSelect';

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  columnData: any,
  rulePropertyValue: number[],
  parent: any,
  updatePriceRuleProperty: (rulePropertyValue: number[]) => void
};

export class MultiSelectCellPresenter extends React.Component<Props> {
  clipLabel = (label: string) => {
    const length = this.props.columnData.labelLength || 13;
    return label.length > length ? `${label.slice(0, length)}...` : label;
  };

  items = () => {
    const { columnData } = this.props;
    const { optionsKey } = columnData;

    return columnData[optionsKey];
  };

  onItemClicked = (item: Option) => {
    const { rulePropertyValue, updatePriceRuleProperty } = this.props;

    const itemPreviouslySelected = rulePropertyValue.some((i) => i === item.id);

    const newlySelectedItemIds = itemPreviouslySelected
      ? rulePropertyValue.filter((o) => o !== item.id)
      : [...rulePropertyValue, item.id];

    updatePriceRuleProperty(newlySelectedItemIds);
  };

  toggleSelectAll = (allSected: boolean) => {
    const { updatePriceRuleProperty } = this.props;

    const selectedIds = allSected ? this.items().map((i) => i.id) : [];
    updatePriceRuleProperty(selectedIds);
  };

  render() {
    const {
      columnData: { label, labelFn },
      rulePropertyValue
    } = this.props;

    const items = this.items();
    const selectedNumber = rulePropertyValue.length;

    const cellLabel =
      selectedNumber === 1
        ? this.clipLabel(
            labelFn(items.find((i) => i.id === rulePropertyValue[0]))
          )
        : `${selectedNumber} ${label}`;

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
          <Text title={selectedTitles}>{cellLabel}</Text>
        </Flex>
      );
    }

    return (
      <MultiSelect
        options={items}
        labelFn={labelFn}
        selected={rulePropertyValue}
        onItemClicked={this.onItemClicked}
        label={label}
        cellLabel={cellLabel}
        toggleSelectAll={this.toggleSelectAll}
        gridProps={this.props.parent.props}
      />
    );
  }
}
