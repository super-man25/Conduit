// @flow
import React from 'react';
import { connect } from 'react-redux';

import { colors } from '_constants';
import { actions } from '_state/priceRule';
import { Text, Flex } from '_components';

type Props = {
  ruleId: number,
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  isNewRule: boolean,
  isLoading: boolean,
  editingAnyPriceRule: boolean,
  startEditingRule: () => void,
  cancelEditingRule: () => void,
  deletePriceRule: (number) => void,
  saveEditedRule: () => void,
  bulkUpdateInProgress: boolean,
};

export const RuleControlsCellPresenter = ({
  ruleId,
  startEditingRule,
  cancelEditingRule,
  saveEditedRule,
  deletePriceRule,
  editingAnyPriceRule,
  isEditing,
  isNewRule,
  isLoading,
  bulkUpdateInProgress,
}: Props) => {
  const disabled = editingAnyPriceRule || bulkUpdateInProgress;
  const startEditing = () => {
    if (disabled || isLoading) return;
    startEditingRule();
  };

  const confirmDelete = () => {
    const msg = 'Are you sure you want to delete this pricing rule?';
    if (window.confirm(msg)) {
      deletePriceRule(ruleId);
    }
  };

  if (!isEditing) {
    return (
      <Flex align="center" justify="flex-end">
        <Text
          size={14}
          color={disabled || isLoading ? colors.lightGray : colors.blue}
          onClick={startEditing}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          weight="heavy"
          marginRight="15px"
        >
          Edit
        </Text>
        <Text
          size={14}
          weight="heavy"
          color={disabled ? colors.lightGray : colors.red}
          onClick={disabled ? null : confirmDelete}
          style={disabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
        >
          Delete
        </Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="flex-end">
      <Text
        size={14}
        color={colors.blue}
        onClick={saveEditedRule}
        style={{ cursor: 'pointer' }}
        weight="heavy"
        marginRight="15px"
      >
        Save
      </Text>
      <Text
        size={14}
        weight="heavy"
        color={colors.red}
        onClick={cancelEditingRule}
        style={{ cursor: 'pointer' }}
      >
        Cancel
      </Text>
    </Flex>
  );
};

const mapStateToProps = (
  { priceRule: { allRows, editingRowId, loading } },
  { rowData }
) => {
  const row = allRows.find((pr) => pr.id === rowData.id);
  return {
    editingAnyPriceRule: editingRowId !== null,
    isNewRule: row.id === 0,
    isLoading: loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditingRule: () =>
    dispatch(actions.startEditingPriceRule(ownProps.rowData.id)),
  cancelEditingRule: () =>
    dispatch(actions.cancelEditingPriceRule(ownProps.rowData.id)),
  saveEditedRule: () => dispatch(actions.savePriceRule(ownProps.rowData.id)),
  deletePriceRule: (payload) => dispatch(actions.deletePriceRule(payload)),
});

export const RuleControlsCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleControlsCellPresenter);
