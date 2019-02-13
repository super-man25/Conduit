// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Flex } from '_components';
import { SavePricingRuleButton, CancelEditingButton } from './styled';
import { cssConstants } from '_constants';
import { actions } from '_state/priceRule';

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  isNewRule: boolean,
  editingAnyPriceRule: boolean,
  startEditingRule: () => void,
  cancelEditingRule: () => void,
  saveEditedRule: () => void
};

export class EditRuleCellPresenter extends React.Component<Props> {
  startEditingRule = () => {
    const { startEditingRule, editingAnyPriceRule } = this.props;
    if (editingAnyPriceRule) return;
    startEditingRule();
  };

  cancelEditingRule = () => {
    const { cancelEditingRule } = this.props;
    cancelEditingRule();
  };

  saveEditedRule = () => {
    const { saveEditedRule } = this.props;
    saveEditedRule();
  };

  render() {
    const { editingAnyPriceRule, isEditing, isNewRule } = this.props;

    if (!isEditing) {
      return (
        <Flex align="center">
          <Text
            size={14}
            color={
              editingAnyPriceRule
                ? cssConstants.PRIMARY_LIGHT_GRAY
                : cssConstants.PRIMARY_LIGHT_BLUE
            }
            onClick={this.startEditingRule}
            style={{
              cursor: 'pointer'
            }}
          >
            EDIT RULE
          </Text>
        </Flex>
      );
    }

    return (
      <Flex justify="space-around">
        <CancelEditingButton onClick={this.cancelEditingRule}>
          Cancel
        </CancelEditingButton>
        <SavePricingRuleButton onClick={this.saveEditedRule}>
          {isNewRule ? 'Create' : 'Save'}
        </SavePricingRuleButton>
      </Flex>
    );
  }
}

const mapStateToProps = (
  { priceRule: { allRows, editingRowId } },
  { rowData }
) => {
  const row = allRows.find((pr) => pr.id === rowData.id);
  return {
    editingAnyPriceRule: editingRowId !== null,
    isNewRule: row.id === null
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditingRule: () =>
    dispatch(actions.startEditingPriceRule(ownProps.rowData.id)),
  cancelEditingRule: () =>
    dispatch(actions.cancelEditingPriceRule(ownProps.rowData.id)),
  saveEditedRule: () => dispatch(actions.saveEditedPriceRule(ownProps.rowIndex))
});

export const EditRuleCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRuleCellPresenter);
