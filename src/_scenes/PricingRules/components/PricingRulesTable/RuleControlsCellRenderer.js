// @flow
import React from 'react';
import { connect } from 'react-redux';

import { cssConstants } from '_constants';
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
}: Props) => {
  const startEditing = () => {
    if (editingAnyPriceRule || isLoading) return;
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
          color={
            editingAnyPriceRule || isLoading
              ? cssConstants.PRIMARY_LIGHT_GRAY
              : cssConstants.PRIMARY_BLUE
          }
          onClick={startEditing}
          style={{ cursor: editingAnyPriceRule ? 'not-allowed' : 'pointer' }}
          weight="heavy"
          marginRight="15px"
        >
          EDIT
        </Text>
        <Text
          size={14}
          weight="heavy"
          color={
            editingAnyPriceRule
              ? cssConstants.PRIMARY_LIGHT_GRAY
              : cssConstants.SECONDARY_RED
          }
          onClick={editingAnyPriceRule ? null : confirmDelete}
          style={
            editingAnyPriceRule
              ? { cursor: 'not-allowed' }
              : { cursor: 'pointer' }
          }
        >
          DELETE
        </Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="flex-end">
      <Text
        size={14}
        color={cssConstants.PRIMARY_BLUE}
        onClick={saveEditedRule}
        style={{ cursor: 'pointer' }}
        weight="heavy"
        marginRight="15px"
      >
        SAVE
      </Text>
      <Text
        size={14}
        weight="heavy"
        color={cssConstants.SECONDARY_RED}
        onClick={cancelEditingRule}
        style={{ cursor: 'pointer' }}
      >
        CANCEL
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
