import { connect } from 'react-redux';
import { actions } from '_state/priceRule';

const mapStateToProps = (
  { priceRule: { allRows, editingRowId, editingRowState } },
  { rowData, dataKey }
) => {
  const isEditing = editingRowId === rowData.id;
  const row = isEditing
    ? editingRowState
    : allRows.find((pr) => pr.id === rowData.id) || {};
  return {
    isEditing,
    rulePropertyValue: row[dataKey],
    ruleId: allRows.find((pr) => pr.id === rowData.id).id,
  };
};

const mapDispatchToProps = (dispatch, { rowData, dataKey }) => ({
  updatePriceRuleProperty: (value) =>
    dispatch(
      actions.updatePriceRuleProperty({
        id: rowData.id,
        propertyName: dataKey,
        propertyValue: value,
      })
    ),
});

export const withEditingProps = connect(mapStateToProps, mapDispatchToProps);
