// @flow
import * as React from 'react';
import {
  Table,
  Column,
  AutoSizer,
  defaultTableRowRenderer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/eventInventory';
import { connect } from 'react-redux';

import { CenteredLoader, Flex, Text } from '_components';
import type { EDEvent, EDInventoryRow, EDVenuePriceScale } from '_models';
import { getInventoryColumns } from './InventoryColumns';

type Props = {
  event: EDEvent,
  allRows: EDInventoryRow[],
  rows: EDInventoryRow[],
  priceScales: EDVenuePriceScale[],
  loading: boolean,
  error: ?Error,
  fetchInventory: (id: number) => void,
  reset: () => void
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
      className
    });
  }

  return tableRowFn;
};

const rowRenderer = withAlternatingBackgroundColor(defaultTableRowRenderer);

const NoTableRowsText = ({ children }: { children: React.Node }) => (
  <Flex justify="center" align="center" height="100%">
    <Text size={16}>{children}</Text>
  </Flex>
);

export class VirtualizedEventInventoryPresenter extends React.Component<Props> {
  componentDidMount() {
    const { event } = this.props;
    this.props.fetchInventory(event.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { allRows, rows, loading, error, priceScales } = this.props;
    const columns = getInventoryColumns(this.props);

    if (loading) {
      return (
        <div style={{ position: 'relative', height: '100%' }}>
          <CenteredLoader />
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

    if (allRows.length === 0) {
      return (
        <NoTableRowsText>
          There is no inventory data available for this event.
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
                There is no data available for the selected filters
              </NoTableRowsText>
            )}
          >
            {columns.map((column) => (
              <Column
                key={column.label}
                columnData={{ allRows, priceScales }}
                {...column}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allRows: selectors.selectAllEventInventoryRows,
  error: selectors.selectEventInventoryError,
  filter: selectors.selectEventInventoryFilter,
  loading: selectors.selectEventInventoryLoading,
  priceScales: selectors.selectScaleFilters,
  rows: selectors.selectEventInventoryRows,
  sections: selectors.selectSectionFilters,
  selectedScaleFilters: selectors.selectSelectedScaleFilters,
  selectedSectionFilters: selectors.selectSelectedSectionFilters
});

const mapDispatchToProps = {
  clearScaleFilters: actions.clearSelectedScaleFilters,
  clearSectionFilters: actions.clearSelectedSectionFilters,
  fetchInventory: actions.fetchEventInventory,
  reset: actions.resetEventInventory,
  setEventInventoryFilter: actions.setEventInventoryFilter,
  setSelectedScaleFilters: actions.setSelectedScaleFilters,
  setSelectedSectionFilters: actions.setSelectedSectionFilters
};

export const VirtualizedEventInventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedEventInventoryPresenter);
