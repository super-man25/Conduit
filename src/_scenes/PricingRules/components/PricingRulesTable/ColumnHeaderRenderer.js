// @flow
import * as React from 'react';
import { TableHeaderCell, PositionedBox } from './styled';
import { Flex, Text } from '_components';
import { actions } from '_state/eventInventory';
import { connect } from 'react-redux';

type Props = {
  isFiltered: boolean,
  filterDirection: 'asc' | 'desc',
  setFilter: () => void,
  disableSort: boolean,
  label: string
};

export const DefaultColumnHeaderPresenter = ({
  label,
  setFilter,
  isFiltered,
  filterDirection
}: Props) => {
  return (
    <TableHeaderCell active={isFiltered}>
      <PositionedBox position="relative">
        <Flex align="left">
          <Text weight={600}>{label}</Text>{' '}
        </Flex>
      </PositionedBox>
    </TableHeaderCell>
  );
};

const mapStateToProps = (
  { eventInventory: { filterDirection, filterName } },
  ownProps
) => ({
  isFiltered: filterName === ownProps.dataKey,
  filterDirection
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => dispatch(actions.setEventInventoryFilter(ownProps.dataKey))
});

const ColumnHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultColumnHeaderPresenter);

export const defaultColumnHeaderRenderer = (props: any) => (
  <ColumnHeader {...props} />
);
