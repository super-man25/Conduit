// @flow
import React from 'react';
import styled from 'styled-components';

import { Text } from '_components';
import { colors } from '_constants';

const StyledTable = styled.table`
  border-spacing: 0;
  font-size: 1.125rem;
`;

const Td = styled.td`
  padding: 6px;
`;

const Thead = styled.thead`
  font-weight: 600;
`;

const Tbody = styled.tbody`
  > tr:nth-child(odd) {
    background-color: ${colors.lightGray};
  }
`;

type Props = {
  columns: Array<string>,
  header?: { [column: string]: string },
  data: Array<{ [column: string]: string }>,
};

function renderCells(columns, identifier, rowData) {
  return columns.map((c) => (
    <Td key={`${identifier}.${c}`}>
      <Text>{rowData[c]}</Text>
    </Td>
  ));
}

export function Table(props: Props) {
  const { columns, header, data } = props;

  return (
    <StyledTable>
      {header && (
        <Thead>
          <tr>{renderCells(columns, 'header', header)}</tr>
        </Thead>
      )}
      <Tbody>
        {data.map((rowData, idx) => (
          <tr key={`row.${idx}`}>
            {renderCells(columns, `row.${idx}`, rowData)}
          </tr>
        ))}
      </Tbody>
    </StyledTable>
  );
}
