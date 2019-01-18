// @flow
import * as React from 'react';
import { Toggle, Box } from '_components';
import { connect } from 'react-redux';
import { actions } from '_state/eventInventory';

type Props = {
  cellData: any,
  setListed: () => void
};

export const ListedColumnCellPresenter = ({ cellData, setListed }: Props) => (
  <Box marginLeft="1.25rem">
    <Toggle isChecked={cellData} onChange={setListed} size="xsmall" />
  </Box>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  setListed: () =>
    dispatch(actions.setEventRowListed(ownProps.rowData, !ownProps.cellData))
});

const ListedColumnCell = connect(
  null,
  mapDispatchToProps
)(ListedColumnCellPresenter);

export const listedColumnCellRenderer = (props: Props) => (
  <ListedColumnCell {...props} />
);
