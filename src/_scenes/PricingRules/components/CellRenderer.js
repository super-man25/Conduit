// @flow
import * as React from 'react';
import { Flex, NumberInputField } from '_components';
import { EditPricingRuleInput } from './styled';

type Props = {
  cellData: any,
  isEditing: boolean,
  rulePropertyValue: string,
  columnData: any,
  updatePriceRuleProperty: (any) => void,
};

type State = {
  rulePropertyValue: string,
};

export class DefaultCellPresenter extends React.Component<Props, State> {
  state = { rulePropertyValue: '' };

  onRulePropertyChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = (e.currentTarget: HTMLInputElement);
    const { updatePriceRuleProperty } = this.props;

    // convert empty string values to null
    const newPriceRuleProperty = value === '' ? null : value;

    updatePriceRuleProperty(newPriceRuleProperty);
  };

  render() {
    const {
      isEditing,
      rulePropertyValue,
      columnData: { displayFn },
    } = this.props;

    const value = rulePropertyValue || '';

    if (isEditing) {
      return (
        <Flex align="center">
          <NumberInputField
            component={EditPricingRuleInput}
            value={value}
            onChange={this.onRulePropertyChange}
            placeholder={'-'}
          />
        </Flex>
      );
    }
    return <Flex align="center"> {displayFn(value)} </Flex>;
  }
}
