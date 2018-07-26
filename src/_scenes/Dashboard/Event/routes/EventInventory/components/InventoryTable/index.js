// @flow
import * as React from 'react';
import {
  Table,
  Column,
  AutoSizer,
  defaultTableRowRenderer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { formatUSD } from '_helpers/string-utils';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/eventInventory';
import { connect } from 'react-redux';
import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { listedColumnCellRenderer } from './ListedColumnCellRenderer';
import { manualPricingColumnCellRenderer } from './ManualPricingColumnCellRenderer';
import { selectableColumnHeaderRenderer } from './SelectableHeaderRenderer';
import { selectableColumnCellRenderer } from './SelectableCellRenderer';
import { defaultCellRenderer } from './CellRenderer';
import { CenteredLoader, Flex, Text } from '_components';
import { scaleColumnHeaderRenderer } from './ScaleColumnHeaderRenderer';
import type { EDEvent, EDInventoryRow } from '_models';

function combineColumnWithDefaults(column) {
  return {
    headerRenderer: defaultColumnHeaderRenderer,
    cellRenderer: defaultCellRenderer,
    ...column
  };
}

const columns = [
  {
    label: 'Checkbox',
    width: 5,
    flexGrow: 2,
    dataKey: '',
    headerRenderer: selectableColumnHeaderRenderer,
    cellRenderer: selectableColumnCellRenderer
  },
  {
    label: 'Scale',
    width: 0,
    dataKey: 'priceScaleId',
    flexGrow: 15,
    headerRenderer: scaleColumnHeaderRenderer
  },
  {
    label: 'Section',
    width: 0,
    dataKey: 'section',
    flexGrow: 10
  },
  {
    label: 'Row',
    width: 0,
    dataKey: 'row',
    flexGrow: 10
  },
  {
    label: '# of Seats',
    width: 0,
    dataKey: 'seats',
    flexGrow: 10,
    cellDataGetter({ columnData, dataKey, rowData }) {
      return rowData[dataKey].length;
    }
  },
  {
    label: 'List Price',
    width: 0,
    dataKey: 'listedPrice',
    flexGrow: 15,
    cellDataGetter({ columnData, dataKey, rowData }) {
      return formatUSD(rowData[dataKey]);
    }
  },
  {
    label: 'Listed',
    width: 0,
    dataKey: 'isListed',
    flexGrow: 10,
    cellRenderer: listedColumnCellRenderer
  },
  {
    label: 'Manual Pricing',
    width: 0,
    dataKey: 'overridePrice',
    flexGrow: 25,
    disableSort: true,
    cellRenderer: manualPricingColumnCellRenderer
  }
].map(combineColumnWithDefaults);

type Props = {
  event: EDEvent,
  allRows: EDInventoryRow[],
  rows: EDInventoryRow[],
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

const NoTableRowsText = ({ children }) => (
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
    const { allRows, rows, loading, error } = this.props;

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
            rowRenderer={rowRenderer}
            noRowsRenderer={() => (
              <NoTableRowsText>
                There is no data available for the selected filters
              </NoTableRowsText>
            )}
          >
            {columns.map((column) => <Column key={column.label} {...column} />)}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allRows: selectors.selectAllEventInventoryRows,
  rows: selectors.selectEventInventoryRows,
  loading: selectors.selectEventInventoryLoading,
  error: selectors.selectEventInventoryError
});

const mapDispatchToProps = {
  fetchInventory: actions.fetchEventInventory,
  reset: actions.resetEventInventory
};

export const VirtualizedEventInventory = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedEventInventoryPresenter);
