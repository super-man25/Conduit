// @flow
import React, { useEffect } from 'react';
import {
  Table,
  Column,
  AutoSizer,
  defaultTableRowRenderer,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/eventInventory';
import { connect } from 'react-redux';
import { Loader, Flex, Text } from '_components';
import { getInventoryColumns } from './InventoryColumns';
import type { EDEvent, EDInventoryRow, EDVenuePriceScale } from '_models';
import type { Node } from 'react';

type Props = {
  allRows: EDInventoryRow[],
  event: EDEvent,
  error: ?Error,
  loading: boolean,
  priceScales: EDVenuePriceScale[],
  rows: EDInventoryRow[],
  fetchInventory: (id: number) => void,
  reset: () => void,
};

const withAlternatingBackgroundColor = (rowRenderer) => {
  function tableRowFn(props) {
    const { index } = props;
    let className = props.className;

    if (index % 2) {
      className += ' ReactVirtualized__Table__row--even';
    }

    return rowRenderer({
      ...props,
      className,
    });
  }

  return tableRowFn;
};

const rowRenderer = withAlternatingBackgroundColor(defaultTableRowRenderer);

const NoTableRowsText = ({ children }: { children: Node }) => (
  <Flex justify="center" align="center" height="100%">
    <Text size={16}>{children}</Text>
  </Flex>
);

export const VirtualizedEventInventoryPresenter = (props: Props) => {
  const {
    allRows,
    error,
    event,
    fetchInventory,
    loading,
    priceScales,
    reset,
    rows,
  } = props;
  const columns = getInventoryColumns(props);

  useEffect(() => {
    fetchInventory(event.id);

    return () => {
      reset();
    };
  }, [event, fetchInventory, reset]);

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <Loader centered />
      </div>
    );
  }

  if (error) {
    return (
      <NoTableRowsText>
        There was an issue loading this events inventory.
      </NoTableRowsText>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          headerHeight={45}
          rowHeight={60}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          overscanRowCount={50}
          overscanColumnCount={6}
          rowRenderer={rowRenderer}
          noRowsRenderer={() => (
            <NoTableRowsText>
              There was no inventory data available
            </NoTableRowsText>
          )}
        >
          {columns.map((column) => (
            <Column
              key={column.label}
              {...column}
              columnData={{ allRows, priceScales, ...column.columnData }}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

const mapStateToProps = createStructuredSelector({
  allRows: selectors.selectAllEventInventoryRows,
  error: selectors.selectEventInventoryError,
  filter: selectors.selectEventInventoryFilter,
  loading: selectors.selectEventInventoryLoading,
  priceScales: selectors.selectScaleFilters,
  rows: selectors.selectEventInventoryRows,
  sections: selectors.selectSectionFilters,
  selectedScaleFilters: selectors.selectSelectedScaleFilters,
  selectedSectionFilters: selectors.selectSelectedSectionFilters,
});

const mapDispatchToProps = {
  clearScaleFilters: actions.clearSelectedScaleFilters,
  clearSectionFilters: actions.clearSelectedSectionFilters,
  fetchInventory: actions.fetchEventInventory,
  reset: actions.resetEventInventory,
  setEventInventoryFilter: actions.setEventInventoryFilter,
  setSelectedScaleFilters: actions.setSelectedScaleFilters,
  setSelectedSectionFilters: actions.setSelectedSectionFilters,
};

export const VirtualizedEventInventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedEventInventoryPresenter);
