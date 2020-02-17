// @flow
import * as React from 'react';
import {
  Table,
  Column,
  AutoSizer,
  defaultTableRowRenderer,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import {
  selectors as priceRuleSelectors,
  actions as priceRuleActions,
} from '_state/priceRule';
import {
  actions as eventListActions,
  selectors as eventSelectors,
} from '_state/eventList';
import { selectors as buyerTypeSelectors } from '_state/buyerType';
import {
  selectors as priceScaleSelectors,
  actions as priceScaleActions,
} from '_state/priceScale';
import {
  actions as eventCategoryActions,
  selectors as eventCategorySelectors,
} from '_state/eventCategory';
import { formatUSD, compare } from '_helpers/string-utils';
import { Loader, Flex, Text } from '_components';
import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { MultiSelectCellPresenter } from './MultiSelectCellRenderer';
import { DropDownCellPresenter } from './DropdownCellRenderer';
import { ToggleCellPresenter } from './ToggleCellRenderer';
import { DefaultCellPresenter } from './CellRenderer';
import { withEditingProps } from './withEditingProps';
import { withPricingRuleRowStyles } from './withPricingRuleRowStyles';
import { RuleControlsCell } from './RuleControlsCellRenderer';

import type { EDBuyerType } from '_models/buyerType';
import type { EDPriceScale } from '_models/priceScale';
import type { EDEvent } from '_models/event';
import type { EDPriceRule } from '_models/priceRule';
import type { EDEventCategory } from '_models/eventCategory';

function combineColumnWithDefaults(column) {
  return {
    headerRenderer: defaultColumnHeaderRenderer,
    cellRenderer: asNodeWithEditingProps(DefaultCellPresenter),
    width: 0,
    flexGrow: 10,
    ...column,
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
      sortFn: (first, second) => {
        // Sort known codes first, then unknown
        if (!first.isInPriceStructure && second.isInPriceStructure) {
          return 1;
        }
        if (first.isInPriceStructure && !second.isInPriceStructure) {
          return -1;
        }

        // Next, sort by code
        if (first.code !== second.code) {
          return compare(first.code, second.code);
        }

        // If codes are the same, then sort by public description
        return compare(first.publicDescription, second.publicDescription);
      },
      labelFn: (option, truncate = true) => {
        const labelText = !!option
          ? `${option.code} - ${option.publicDescription}`
          : 'Unknown';
        return <Text ellipsis={truncate}>{labelText}</Text>;
      },
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter),
  },
  {
    label: 'Price Scales',
    dataKey: 'priceScaleIds',
    columnData: {
      optionsKey: 'priceScales',
      labelFn: (option) => option.name,
      sortFn: (first, second) => (first.name >= second.name ? 1 : -1),
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter),
  },
  {
    label: 'Mirrors',
    dataKey: 'mirrorPriceScaleId',
    columnData: {
      optionsKey: 'priceScales',
      hasId: true,
      hasNone: false,
      sortFn: (first, second) => (first.name >= second.name ? 1 : -1),
    },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter),
  },
  {
    label: '% Change',
    dataKey: 'percent',
    columnData: {
      displayFn: (percent) => {
        if (!percent) return '-';
        if (percent >= 0) return `+${percent}%`;
        return `${percent}%`;
      },
    },
  },
  {
    label: '$ Change',
    dataKey: 'constant',
    columnData: {
      displayFn: (dollars) => {
        if (!dollars) return '-';
        if (dollars >= 0) return `+${formatUSD(dollars)}`;
        return formatUSD(dollars);
      },
    },
  },
  {
    label: 'Events',
    dataKey: 'eventIds',
    columnData: {
      optionsKey: 'events',
      labelLength: 28,
      labelFn: (option) =>
        option && `${format(option.timestamp, 'M/d/yyyy')} - ${option.name}`,
      isGroupable: true,
      grouping: {
        categoriesKey: 'eventCategories',
        groupedKey: 'eventsGroupedByCategoryId',
      },
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter),
  },
  {
    label: 'Round',
    dataKey: 'round',
    columnData: { optionsKey: 'roundOptions', hasId: true, hasNone: true },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter),
  },
  {
    label: 'Price Floor',
    dataKey: 'priceFloor',
    columnData: {
      displayFn: (value) => formatUSD(value),
    },
  },
  {
    label: 'Price Ceiling',
    dataKey: 'priceCeiling',
    columnData: {
      displayFn: (value) => (value ? formatUSD(value) : '-'),
    },
  },
  {
    label: 'Enabled',
    dataKey: 'isActive',
    cellRenderer: asNodeWithEditingProps(ToggleCellPresenter),
  },
  {
    label: '',
    dataKey: '',
    minWidth: 125,
    cellRenderer: asNodeWithEditingProps(RuleControlsCell),
  },
].map(combineColumnWithDefaults);

const roundOptions = [
  { id: 'Ceil', name: 'Up' },
  { id: 'Floor', name: 'Down' },
  { id: 'Round', name: 'Nearest Dollar' },
  { id: 'None', name: 'No Rounding' },
];

const NoTableRowsText = ({ children }) => (
  <Flex justify="center" align="center" height="100%">
    <Text size={16}>{children}</Text>
  </Flex>
);

type Props = {
  fetchPriceScales: () => EDPriceScale[],
  fetchEventList: (payload: { seasonId: number }) => EDEvent[],
  fetchPriceRules: () => EDPriceRule[],
  fetchEventCategories: () => EDEventCategory[],
  reset: () => void,
  rows: EDPriceRule[],
  events: EDEvent[],
  buyerTypes: EDBuyerType[],
  priceScales: EDPriceScale[],
  eventCategoryMap: any,
  eventCategories: EDEventCategory[],
  eventsGroupedByCategoryId: any,
  buyerTypesLoading: boolean,
  priceRulesLoading: boolean,
  priceScalesLoading: boolean,
  eventCategoriesLoading: boolean,
  eventsLoading: boolean,
  activeSeasonId: number,
};

export class VirtualizedPricingRulesPresenter extends React.Component<Props> {
  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.activeSeasonId !== this.props.activeSeasonId) {
      this.fetchData();
    }
  }

  fetchData() {
    const {
      activeSeasonId,
      fetchEventList,
      fetchEventCategories,
      fetchPriceRules,
      fetchPriceScales,
    } = this.props;

    fetchPriceScales();
    fetchEventList({ seasonId: activeSeasonId });
    fetchPriceRules();
    fetchEventCategories();
  }

  render() {
    const {
      rows,
      events,
      buyerTypes,
      priceScales,
      eventCategories,
      eventsGroupedByCategoryId,
      buyerTypesLoading,
      priceScalesLoading,
      priceRulesLoading,
      eventCategoriesLoading,
      eventsLoading,
    } = this.props;
    const rowRenderer = withPricingRuleRowStyles(defaultTableRowRenderer);

    // if buyer types cannot be loaded do not display table
    const rowCount = buyerTypes.length > 0 ? rows.length : 0;

    if (
      buyerTypesLoading ||
      priceScalesLoading ||
      priceRulesLoading ||
      eventCategoriesLoading ||
      eventsLoading
    ) {
      return (
        <div style={{ position: 'relative', height: '100%' }}>
          <Loader centered />
        </div>
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
            rowCount={rowCount}
            rowGetter={({ index }) => rows[index]}
            overscanRowCount={50}
            rowRenderer={rowRenderer}
            noRowsRenderer={() => (
              <NoTableRowsText>
                No Pricing Rules Available To Display
              </NoTableRowsText>
            )}
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
                  buyerTypes,
                  eventCategories,
                  eventsGroupedByCategoryId,
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
  eventsGroupedByCategoryId: eventSelectors.selectGroupedByCategoryId,
  buyerTypes: buyerTypeSelectors.selectAllBuyerTypes,
  priceScales: priceScaleSelectors.selectAllPriceScales,
  eventCategories: eventCategorySelectors.selectAllEventCategories,
  buyerTypesLoading: buyerTypeSelectors.selectIsLoading,
  priceScalesLoading: priceScaleSelectors.selectIsLoading,
  priceRulesLoading: priceRuleSelectors.selectIsLoading,
  eventCategoriesLoading: eventCategorySelectors.selectIsLoading,
  eventsLoading: eventSelectors.selectIsLoading,
});

const mapDispatchToProps = {
  fetchPriceRules: priceRuleActions.fetchPriceRules,
  fetchEventList: eventListActions.fetchEventList,
  reset: priceRuleActions.resetPriceRules,
  fetchPriceScales: priceScaleActions.fetchPriceScales,
  fetchEventCategories: eventCategoryActions.fetchEventCategories,
};

export const VirtualizedPricingRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedPricingRulesPresenter);
