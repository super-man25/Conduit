// @flow
import React, { Component } from 'react';
import { Flex, Text } from '_components';
import {
  Table,
  Column,
  AutoSizer,
  defaultTableRowRenderer,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { withRowStyles } from './withRowStyles';
import { orDash } from '_helpers/string-utils';
import type { EDUser } from '_models/user';

type Props = {
  userList: EDUser[],
  fetchUserList: () => EDUser[],
  reset: () => void,
};

const columns = [
  {
    label: 'First Name',
    dataKey: 'firstName',
    flexGrow: 6,
    columnData: {
      labelFn: (option) => option.firstName,
    },
  },
  {
    label: 'Last Name',
    dataKey: 'lastName',
    flexGrow: 6,
    columnData: {
      labelFn: (option) => option.lastName,
    },
  },
  {
    label: 'Email',
    dataKey: 'email',
    flexGrow: 6,
    columnData: {
      labelFn: (option) => option.email,
    },
  },
  {
    label: 'Phone Number',
    dataKey: 'phoneNumber',
    flexGrow: 6,
    cellRenderer: ({ cellData }) => {
      return orDash(cellData);
    },
  },
];

export class UsersTable extends Component<Props> {
  componentDidMount() {
    this.props.fetchUserList();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { userList } = this.props;
    const rowRenderer = withRowStyles(defaultTableRowRenderer);
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            headerHeight={45}
            rowHeight={60}
            overscanRowCount={10}
            rowCount={userList.length}
            rowGetter={({ index }) => userList[index]}
            rowRenderer={rowRenderer}
            noRowsRenderer={() => (
              <Flex justify="center" align="center" height="100%">
                <Text size={16}>No Users</Text>
              </Flex>
            )}
          >
            {columns.map((column) => (
              <Column key={column.dataKey} {...column} width={100} />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}
