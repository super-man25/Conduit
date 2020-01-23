// @flow
import * as React from 'react';
import { Text, Flex } from '_components';
import { Dropdown } from './Dropdown';

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  columnData: any,
  rulePropertyValue: string | number,
  parent: any,
  updatePriceRuleProperty: (option: number | string) => void,
};

type State = {
  selectedOption: any,
};

type DropdownOption = {
  name: string,
  id: string | number,
};

const labelLength = 13;
const clipLabel = (label) =>
  label.length > labelLength ? `${label.slice(0, labelLength)}...` : label;

export class DropDownCellPresenter extends React.Component<Props, State> {
  state = { selectedOption: null };

  items = () => {
    const { columnData } = this.props;
    const { optionsKey, sortFn } = columnData;

    return sortFn
      ? [...columnData[optionsKey]].sort(sortFn)
      : columnData[optionsKey];
  };

  selectedItem(options: any[], item: string | number, hasId: boolean) {
    const selectedItem = options.find((o) =>
      hasId ? o.id === item : o === item
    );

    if (!selectedItem) return { name: '-', id: null };

    return {
      name: hasId ? selectedItem.name : selectedItem,
      id: hasId ? selectedItem.id : selectedItem,
    };
  }

  optionsAsObject(options: any[], hasId: boolean): DropdownOption[] {
    if (hasId) return options;

    return options.map((o: string): any => ({ name: o, id: o }));
  }

  setSelectedOption(option: string | number) {
    const { updatePriceRuleProperty } = this.props;
    updatePriceRuleProperty(option);
  }

  render() {
    const { columnData, rulePropertyValue } = this.props;
    const options = this.items();
    const { hasId, hasNone } = columnData;

    const withSelectedAsOption = this.selectedItem(
      options,
      rulePropertyValue,
      hasId
    );
    const withOptionsAsObject = this.optionsAsObject(options, hasId);

    if (!this.props.isEditing) {
      return (
        <Flex align="center">
          <Text>{clipLabel(withSelectedAsOption.name)}</Text>
        </Flex>
      );
    }

    return (
      <Dropdown
        options={withOptionsAsObject}
        selected={withSelectedAsOption}
        hasNone={hasNone}
        noneSelected={<Text>None</Text>}
        parseOption={(option) => option.name}
        renderSelected={(option) => <Text>{option.name}</Text>}
        onChange={(option) => this.setSelectedOption(option)}
        gridProps={this.props.parent.props}
      />
    );
  }
}
