// @flow
import * as React from 'react';
import { Flex } from '_components';
import { actions, selectors } from '_state/eventInventory';
import { connect } from 'react-redux';

type Props = {
  allSelected: boolean,
  selectAll: () => void
};

export const SelectableHeaderPresenter = ({
  allSelected,
  selectAll
}: Props) => {
  return (
    <Flex align="center" justify="center">
      <input type="checkbox" checked={allSelected} onChange={selectAll} />
    </Flex>
  );
};

const mapStateToProps = (store) => {
  const { selectedRowIds } = store.eventInventory;
  const rows = selectors.selectEventInventoryRows(store);

  return {
    allSelected: selectedRowIds.length === rows.length
  };
};

const mapDispatchToProps = {
  selectAll: actions.selectAllEventRows
};

const SelectableHeader = connect(mapStateToProps, mapDispatchToProps)(
  SelectableHeaderPresenter
);

export const selectableColumnHeaderRenderer = (props: any) => (
  <SelectableHeader {...props} />
);
