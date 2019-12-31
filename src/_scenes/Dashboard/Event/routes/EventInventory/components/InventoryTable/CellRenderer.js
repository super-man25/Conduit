// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Flex, NumberInputField, Text } from '_components';
import { actions } from '_state/eventInventory';
import { ManualPricingInput } from './styled';

type Props = {
  cellData: any,
  isEditing: boolean,
  rulePropertyValue: string,
  columnData: any,
  updateEditedRowProperty: (any) => void,
  isEditable: boolean
};

type State = {
  rulePropertyValue: string
};

class DefaultCellPresenter extends React.Component<Props, State> {
  state = { rulePropertyValue: '' };

  onRulePropertyChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = (e.currentTarget: HTMLInputElement);
    const { updateEditedRowProperty } = this.props;

    // convert empty string values to null
    const newProperty = value === '' ? null : value;

    updateEditedRowProperty(newProperty);
  };

  render() {
    const {
      isEditing,
      cellData,
      columnData: { isEditable }
    } = this.props;

    if (isEditing && isEditable) {
      return (
        <Flex align="center">
          <NumberInputField
            component={ManualPricingInput}
            value={cellData}
            onChange={this.onRulePropertyChange}
            placeholder={'-'}
          />
        </Flex>
      );
    }
    return (
      <Flex align="center">
        <Text>{cellData}</Text>
      </Flex>
    );
  }
}

const mapStateToProps = (
  { eventInventory: { editedRowId, loading } },
  { rowData }
) => ({
  isEditing: editedRowId === rowData.id,
  isLoading: loading
});

const mapDispatchToProps = (dispatch, { rowData, dataKey }) => ({
  updateEditedRowProperty: (value) =>
    dispatch(
      actions.updateEditedRowProperty({
        id: rowData.id,
        propertyName: dataKey,
        propertyValue: value
      })
    )
});

const DefaultCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultCellPresenter);

export const defaultCellRenderer = (props: Props) => <DefaultCell {...props} />;
