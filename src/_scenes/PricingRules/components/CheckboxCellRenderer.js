import React from 'react';

export const CheckboxCellRenderer = ({ rowData, columnData }) => {
  const { id } = rowData;
  const { selectForBulkUpdate, deselectForBulkUpdate } = columnData;

  const handleChange = (event) => {
    if (event.target.checked) {
      selectForBulkUpdate(id);
    } else {
      deselectForBulkUpdate(id);
    }
  };

  return <input type="checkbox" onChange={handleChange} />;
};
