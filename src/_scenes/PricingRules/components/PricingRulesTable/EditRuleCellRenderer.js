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
  isLoading: boolean,
  editingAnyPriceRule: boolean,
  startEditingRule: () => void,
  cancelEditingRule: () => void,
  saveEditedRule: () => void
};

export class EditRuleCellPresenter extends React.Component<Props> {
  startEditingRule = () => {
    const { startEditingRule, editingAnyPriceRule, isLoading } = this.props;
    if (editingAnyPriceRule || isLoading) return;
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
    const { editingAnyPriceRule, isEditing, isNewRule, isLoading } = this.props;

    if (!isEditing) {
      return (
        <Flex align="center">
          <Text
            size={14}
            color={
              editingAnyPriceRule || isLoading
                ? cssConstants.PRIMARY_LIGHT_GRAY
                : cssConstants.PRIMARY_LIGHT_BLUE
            }
            onClick={this.startEditingRule}
            style={{ cursor: editingAnyPriceRule ? 'not-allowed' : 'pointer' }}
          >
            EDIT RULE
          </Text>
        </Flex>
      );
    }

    return (
      <Flex justify="space-around">
        <CancelEditingButton
          onClick={this.cancelEditingRule}
          disabled={isLoading}
        >
          Cancel
        </CancelEditingButton>
        <SavePricingRuleButton
          onClick={this.saveEditedRule}
          disabled={isLoading}
        >
          {isNewRule ? 'Create' : 'Save'}
        </SavePricingRuleButton>
      </Flex>
    );
  }
}

const mapStateToProps = (
  { priceRule: { allRows, editingRowId, loading } },
  { rowData }
) => {
  const row = allRows.find((pr) => pr.id === rowData.id);
  return {
    editingAnyPriceRule: editingRowId !== null,
    isNewRule: row.id === 0,
    isLoading: loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditingRule: () =>
    dispatch(actions.startEditingPriceRule(ownProps.rowData.id)),
  cancelEditingRule: () =>
    dispatch(actions.cancelEditingPriceRule(ownProps.rowData.id)),
  saveEditedRule: () => dispatch(actions.savePriceRule(ownProps.rowData.id))
});

export const EditRuleCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRuleCellPresenter);
