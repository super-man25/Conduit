// @flow
import * as React from 'react';
import { Box } from '_components';
import { MultiSelect } from './MultiSelect';
import type { Option } from './MultiSelect';

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  columnData: any,
  rulePropertyValue: number[],
  parent: any,
  isGroupable: boolean,
  updatePriceRuleProperty: (rulePropertyValue: number[]) => void,
};

export class MultiSelectCellPresenter extends React.Component<Props> {
  clipLabel = (label: string) => {
    const length = this.props.columnData.labelLength || 13;
    return label && label.length > length
      ? `${label.slice(0, length)}...`
      : label;
  };

  items = () => {
    const { columnData, rulePropertyValue } = this.props;
    const { optionsKey, sortFn } = columnData;

    const columnDataIds = columnData[optionsKey].map((option) => option.id);
    const options =
      optionsKey === 'buyerTypes'
        ? columnData[optionsKey]
            .filter(
              (option) =>
                option.isInPriceStructure ||
                rulePropertyValue.includes(option.id)
            )
            .concat(
              rulePropertyValue
                .filter((rpv) => !columnDataIds.includes(rpv))
                .map((rpv) => ({
                  id: rpv,
                  code: 'Unknown',
                  publicDescription: rpv,
                  isInPriceStructure: false,
                }))
            )
        : columnData[optionsKey];
    return sortFn ? [...options].sort(sortFn) : options;
  };

  onItemClicked = (item: Option) => {
    const { rulePropertyValue, updatePriceRuleProperty } = this.props;

    const itemPreviouslySelected = rulePropertyValue.some((i) => i === item.id);

    const newlySelectedItemIds = itemPreviouslySelected
      ? rulePropertyValue.filter((o) => o !== item.id)
      : [...rulePropertyValue, item.id];

    updatePriceRuleProperty(newlySelectedItemIds);
  };

  toggleSelectAll = (allSelected: boolean) => {
    const { updatePriceRuleProperty } = this.props;

    const selectedIds = allSelected ? this.items().map((i) => i.id) : [];
    updatePriceRuleProperty(selectedIds);
  };

  render() {
    const {
      columnData: { label, labelFn, isGroupable, optionsKey },
      rulePropertyValue,
      updatePriceRuleProperty,
      columnData,
    } = this.props;

    const items = this.items();
    const disabled =
      optionsKey === 'buyerTypes'
        ? columnData[optionsKey]
            .filter((option) => !option.isInPriceStructure)
            .map((option) => option.id)
            .concat(
              rulePropertyValue.filter(
                (rpv) =>
                  !columnData[optionsKey]
                    .map((option) => option.id)
                    .includes(rpv)
              )
            )
        : [];
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
      .map((option) => {
        // Override the passed in labelFn for the buyer type column to avoid [object Object] bug
        if (label.toLowerCase() === 'buyer types') {
          return !!option
            ? `${option.code} - ${option.publicDescription}`
            : 'Unknown';
        }
        return labelFn(option);
      })
      .reduce((acc, description) => `${acc} ${description},\n`, '')
      .slice(0, -2);

    if (!this.props.isEditing) {
      return <Box title={selectedTitles}>{cellLabel}</Box>;
    }

    return (
      <MultiSelect
        isGroupable={isGroupable}
        columnData={columnData}
        labelFn={labelFn}
        options={items}
        selected={rulePropertyValue}
        disabled={disabled}
        label={label}
        cellLabel={cellLabel}
        toggleSelectAll={this.toggleSelectAll}
        updatePriceRuleProperty={updatePriceRuleProperty}
        onItemClicked={this.onItemClicked.bind(this)}
        gridProps={this.props.parent.props}
      />
    );
  }
}
