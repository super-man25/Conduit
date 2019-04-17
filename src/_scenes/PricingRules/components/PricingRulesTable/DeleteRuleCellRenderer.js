// @flow
import React from 'react';
import { Flex, Text } from '_components';
import { cssConstants } from '_constants';
import { connect } from 'react-redux';
import { actions, selectors } from '_state/priceRule';
import { createStructuredSelector } from 'reselect';

type Props = {
  ruleId: number,
  deletePriceRule: (number) => void,
  editingAnyPriceRule: boolean
};

export const DeleteRuleCellRenderer = (props: Props) => {
  const { ruleId, deletePriceRule, editingAnyPriceRule } = props;

  const confirm = () => {
    const msg = 'Are you sure you want to delete this pricing rule?';
    if (window.confirm(msg)) {
      deletePriceRule(ruleId);
    }
  };
  return (
    <Flex align="center">
      <Text
        size={14}
        color={
          editingAnyPriceRule
            ? cssConstants.PRIMARY_LIGHT_GRAY
            : cssConstants.SECONDARY_RED
        }
        onClick={editingAnyPriceRule ? null : confirm}
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
};

const mapStateToProps = createStructuredSelector({
  editingAnyPriceRule: selectors.selectIsEditingPriceRule
});
const mapDispatchToProps = (dispatch) => ({
  deletePriceRule: (ruleId) => dispatch(actions.deletePriceRule(ruleId))
});

export const DeleteRuleCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRuleCellRenderer);
