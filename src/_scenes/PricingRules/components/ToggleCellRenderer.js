// @flow
import * as React from 'react';

import { Flex, Toggle } from '_components';

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  rulePropertyValue: any,
  updatePriceRuleProperty: (enabled: boolean) => void,
};

export class ToggleCellRenderer extends React.Component<Props> {
  onToggle = () => {
    const { updatePriceRuleProperty, rulePropertyValue } = this.props;
    updatePriceRuleProperty(!rulePropertyValue);
  };

  render() {
    const { rulePropertyValue, isEditing } = this.props;

    return (
      <Flex align="center" margin="1rem">
        <Toggle
          isCheckedDefault={rulePropertyValue}
          isDisabled={!isEditing}
          handleChange={this.onToggle}
        />
      </Flex>
    );
  }
}
