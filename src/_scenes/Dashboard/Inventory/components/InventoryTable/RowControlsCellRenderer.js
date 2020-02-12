// @flow
import React from 'react';
import { connect } from 'react-redux';

import { cssConstants } from '_constants';
import { actions } from '_state/eventInventory';
import { Text, Flex } from '_components';

type Props = {
  rowId: number,
  rowData: { [string]: any },
  cellData: any,
  isNewRow: boolean,
  isLoading: boolean,
  isEditing: boolean,
  editingAnyRow: boolean,
  startEditingRow: () => void,
  cancelEditingRow: () => void,
  saveEditedRow: () => void,
};

export const RowControlsCellPresenter = ({
  rowData,
  rowId,
  startEditingRow,
  cancelEditingRow,
  saveEditedRow,
  isEditing,
  editingAnyRow,
  isNewRow,
  isLoading,
}: Props) => {
  const startEditing = () => {
    // if (isEditing || isLoading) return;
    startEditingRow();
  };

  if (!isEditing) {
    return (
      <Flex align="center" justify="flex-end">
        <Text
          size={14}
          color={
            isEditing || isLoading
              ? cssConstants.PRIMARY_LIGHT_GRAY
              : cssConstants.PRIMARY_BLUE
          }
          onClick={startEditing}
          style={
            editingAnyRow
              ? {
                  cursor: 'not-allowed',
                  opacity: 0.5,
                }
              : {
                  cursor: 'pointer',
                }
          }
          weight="heavy"
          marginRight="15px"
        >
          Edit
        </Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="flex-end">
      <Text
        size={14}
        color={cssConstants.PRIMARY_BLUE}
        onClick={saveEditedRow}
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
        onClick={cancelEditingRow}
        style={{ cursor: 'pointer' }}
      >
        CANCEL
      </Text>
    </Flex>
  );
};

const mapStateToProps = (
  { eventInventory: { editedRowId, loading } },
  { rowData }
) => ({
  isEditing: editedRowId === rowData.id,
  editingAnyRow: editedRowId !== null,
  isLoading: loading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditingRow: () => dispatch(actions.startEditingRow(ownProps.rowData.id)),
  cancelEditingRow: () => dispatch(actions.cancelEditingRow()),
  saveEditedRow: () => dispatch(actions.saveEditedRow()),
});

const RowControlsCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowControlsCellPresenter);

export const rowControlsCellRenderer = (props: Props) => (
  <RowControlsCell {...props} />
);
