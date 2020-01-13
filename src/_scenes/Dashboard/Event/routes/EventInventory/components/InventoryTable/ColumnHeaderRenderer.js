// @flow
import * as React from 'react';
import { TableHeaderCell, PositionedBox } from './styled';
import { SortIcon } from './SortIcon';
import { Flex } from '_components';
import { actions } from '_state/eventInventory';
import { connect } from 'react-redux';

type Props = {
  isFiltered: boolean,
  filterDirection: 'asc' | 'desc',
  setFilter: () => void,
  disableSort: boolean,
  label: string,
};

export const DefaultColumnHeaderPresenter = ({
  disableSort,
  label,
  setFilter,
  isFiltered,
  filterDirection,
}: Props) => {
  return (
    <TableHeaderCell sortable={!disableSort} active={isFiltered}>
      <PositionedBox position="relative">
        {!disableSort && (
          <SortIcon
            isFiltered={isFiltered}
            filterDirection={filterDirection}
            onClick={setFilter}
          />
        )}
        <Flex align="center" marginLeft={!disableSort && '1.25rem'}>
          {label}
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
  filterDirection,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => dispatch(actions.setEventInventoryFilter(ownProps.dataKey)),
});

const ColumnHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultColumnHeaderPresenter);

export const defaultColumnHeaderRenderer = (props: any) => (
  <ColumnHeader {...props} />
);
