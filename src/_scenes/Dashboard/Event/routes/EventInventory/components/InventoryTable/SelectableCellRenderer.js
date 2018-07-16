// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '_state/eventInventory';
import { Flex } from '_components';

type Props = {
  isSelected: boolean,
  select: () => void
};

export const SelectableColumnCellPresenter = ({
  isSelected,
  select
}: Props) => (
  <Flex align="center" justify="center">
    <input type="checkbox" onChange={select} checked={isSelected} />
  </Flex>
);

const mapStateToProps = ({ eventInventory: { selectedRowIds } }, ownProps) => ({
  isSelected: selectedRowIds.includes(ownProps.rowData.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  select: () => dispatch(actions.selectEventRow(ownProps.rowData.id))
});

const SelectableColumnCell = connect(mapStateToProps, mapDispatchToProps)(
  SelectableColumnCellPresenter
);

export const selectableColumnCellRenderer = (props: Props) => (
  <SelectableColumnCell {...props} />
);
