// @flow
import * as React from 'react';
import { Toggle, Box } from '_components';
import { connect } from 'react-redux';
import { actions } from '_state/eventInventory';

type Props = {
  cellData: any,
  isEditing: boolean,
  editedRowState: any,
  dataKey: string,
  updateEditedRowProperty: (any) => void
};

export const ListedColumnCellPresenter = ({
  cellData,
  isEditing,
  editedRowState,
  updateEditedRowProperty,
  dataKey
}: Props) => (
  <Box marginLeft="1.25rem" style={{ opacity: isEditing ? 1 : 0.5 }}>
    <Toggle
      isDisabled={!isEditing}
      isChecked={isEditing ? editedRowState[dataKey] : cellData}
      onChange={() => updateEditedRowProperty(!editedRowState[dataKey])}
      size="xsmall"
    />
  </Box>
);

const mapStateToProps = (
  { eventInventory: { editedRowId, editedRowState } },
  { rowData }
) => ({
  isEditing: editedRowId === rowData.id,
  editedRowState
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

const ListedColumnCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListedColumnCellPresenter);

export const listedColumnCellRenderer = (props: Props) => (
  <ListedColumnCell {...props} />
);
