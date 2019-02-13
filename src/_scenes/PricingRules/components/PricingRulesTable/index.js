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
import {
  selectors as priceRuleSelectors,
  actions as priceRuleActions
} from '_state/priceRule';
import {
  actions as eventListActions,
  selectors as eventSelectors
} from '_state/eventList';
import {
  selectors as buyerTypeSelectors,
  actions as buyerTypeActions
} from '_state/buyerType';
import {
  selectors as priceScaleSelectors,
  actions as priceScaleActions
} from '_state/priceScale';
import { formatUSD } from '_helpers/string-utils';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { MultiSelectCellPresenter } from './MultiSelectCellRenderer';
import { DropDownCellPresenter } from './DropdownCellRenderer';
import { ToggleCellPresenter } from './ToggleCellRenderer';
import { EditRuleCell } from './EditRuleCellRenderer';
import { DefaultCellPresenter } from './CellRenderer';
import { withEditingProps } from './withEditingProps';

import type { EDBuyerType } from '_models/buyerType';
import type { EDPriceScale } from '_models/priceScale';
import type { EDEvent } from '_models/event';
import type { EDPriceRule } from '_models/priceRule';

function combineColumnWithDefaults(column) {
  return {
    headerRenderer: defaultColumnHeaderRenderer,
    cellRenderer: asNodeWithEditingProps(DefaultCellPresenter),
    width: 0,
    flexGrow: 10,
    ...column
  };
}

const asNodeWithEditingProps = (CellPresenter) => {
  const CellRenderer = withEditingProps(CellPresenter);
  return (props: any) => {
    return <CellRenderer {...props} />;
  };
};

const columns = [
  {
    label: 'Buyer Types',
    dataKey: 'externalBuyerTypeIds',
    columnData: {
      optionsKey: 'buyerTypes',
      labelFn: (option) => `${option.code} - ${option.publicDescription}`
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Price Scales',
    dataKey: 'priceScaleIds',
    columnData: { optionsKey: 'priceScales', labelFn: (option) => option.name },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Mirrors',
    dataKey: 'mirrorPriceScaleId',
    flexGrow: 12,
    columnData: { optionsKey: 'priceScales', hasId: true, hasNone: false },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter)
  },
  {
    label: '% Change',
    dataKey: 'percent',
    flexGrow: 8,
    columnData: {
      displayFn: (percent) => {
        if (!percent) return '-';
        if (percent >= 0) return `+${percent}%`;
        return `${percent}%`;
      }
    }
  },
  {
    label: '$ Change',
    dataKey: 'constant',
    flexGrow: 8,
    columnData: {
      displayFn: (dollars) => {
        if (!dollars) return '-';
        if (dollars >= 0) return `+${formatUSD(dollars)}`;
        return formatUSD(dollars);
      }
    }
  },
  {
    label: 'Events',
    dataKey: 'eventIds',
    flexGrow: 8,
    columnData: {
      optionsKey: 'events',
      labelFn: (option) =>
        `${format(option.timestamp, 'M/D/YYYY')} - ${option.name}`
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Round',
    dataKey: 'round',
    flexGrow: 9,
    columnData: { optionsKey: 'roundOptions', hasId: true, hasNone: true },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter)
  },
  {
    label: 'Enabled',
    dataKey: 'isActive',
    flexGrow: 5,
    cellRenderer: asNodeWithEditingProps(ToggleCellPresenter)
  },
  {
    label: '',
    dataKey: '',
    flexGrow: 11,
    cellRenderer: asNodeWithEditingProps(EditRuleCell)
  }
].map(combineColumnWithDefaults);

const roundOptions = [
  { id: 'Ceil', name: 'Up' },
  { id: 'Floor', name: 'Down' },
  { id: 'Round', name: 'Nearest Dollar' },
  { id: 'None', name: 'No Rounding' }
];

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

type Props = {
  fetchPriceScales: () => EDPriceScale[],
  fetchBuyerTypes: () => EDBuyerType[],
  fetchEventList: () => EDEvent[],
  fetchPriceRules: () => EDPriceRule[],
  reset: () => void,
  rows: EDPriceRule[],
  events: EDEvent[],
  buyerTypes: EDBuyerType[],
  priceScales: EDPriceScale[]
};

export class VirtualizedPricingRulesPresenter extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPriceScales();
    this.props.fetchBuyerTypes();
    this.props.fetchEventList();
    this.props.fetchPriceRules();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { rows, events, buyerTypes, priceScales } = this.props;

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
          >
            {columns.map((column) => (
              <Column
                key={column.label}
                {...column}
                columnData={{
                  ...column.columnData,
                  label: column.label,
                  rows,
                  events,
                  roundOptions,
                  priceScales,
                  buyerTypes
                }}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  rows: priceRuleSelectors.selectAllPriceRuleRows,
  events: eventSelectors.selectEventList,
  buyerTypes: buyerTypeSelectors.selectAllBuyerTypes,
  priceScales: priceScaleSelectors.selectAllPriceScales
});

const mapDispatchToProps = {
  fetchPriceRules: priceRuleActions.fetchPriceRules,
  fetchEventList: eventListActions.fetchEventList,
  reset: priceRuleActions.resetPriceRules,
  fetchBuyerTypes: buyerTypeActions.fetchBuyerTypes,
  fetchPriceScales: priceScaleActions.fetchPriceScales
};

export const VirtualizedPricingRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedPricingRulesPresenter);
