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
import { cssConstants } from '_constants';
import {
  selectors as priceRuleSelectors,
  actions as priceRuleActions
} from '_state/priceRule';
import {
  actions as eventListActions,
  selectors as eventSelectors
} from '_state/eventList';
import { selectors as buyerTypeSelectors } from '_state/buyerType';
import {
  selectors as priceScaleSelectors,
  actions as priceScaleActions
} from '_state/priceScale';
import {
  actions as eventCategoryActions,
  selectors as eventCategorySelectors
} from '_state/eventCategory';
import { formatUSD } from '_helpers/string-utils';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Flex, FlexItem, Text } from '_components';
import { Icon } from '_components/Icon';
import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { MultiSelectCellPresenter } from './MultiSelectCellRenderer';
import { DropDownCellPresenter } from './DropdownCellRenderer';
import { ToggleCellPresenter } from './ToggleCellRenderer';
import { EditRuleCell } from './EditRuleCellRenderer';
import { DefaultCellPresenter } from './CellRenderer';
import { withEditingProps } from './withEditingProps';
import { withPricingRuleRowStyles } from './withPricingRuleRowStyles';
import { DeleteRuleCell } from './DeleteRuleCellRenderer';

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
      sortFn: (first, second) => (first.code >= second.code ? 1 : -1),
      labelFn: (option, truncate = true) => {
        if (!option) {
          return 'Unknown';
        }
        const labelText = `${option.code} - ${option.publicDescription}`;
        return (
          <React.Fragment>
            <Flex align="center" width="100%">
              {option.disabled && (
                <FlexItem
                  title="Pricing is disabled for this buyer type"
                  margin="0 0.5rem 0 0"
                  flex="0"
                >
                  <Icon
                    name="api-error"
                    color={cssConstants.SECONDARY_BURNT_ORANGE}
                    size={22}
                  />
                </FlexItem>
              )}
              <Text overflow={truncate}>{labelText}</Text>
            </Flex>
          </React.Fragment>
        );
      }
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Price Scales',
    dataKey: 'priceScaleIds',
    columnData: {
      optionsKey: 'priceScales',
      labelFn: (option) => option.name,
      sortFn: (first, second) => (first.name >= second.name ? 1 : -1)
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Mirrors',
    dataKey: 'mirrorPriceScaleId',
    flexGrow: 8,
    columnData: {
      optionsKey: 'priceScales',
      hasId: true,
      hasNone: false,
      sortFn: (first, second) => (first.name >= second.name ? 1 : -1)
    },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter)
  },
  {
    label: '% Change',
    dataKey: 'percent',
    flexGrow: 6,
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
    flexGrow: 6,
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
    flexGrow: 16,
    columnData: {
      optionsKey: 'events',
      labelLength: 28,
      labelFn: (option) =>
        `${format(option.timestamp, 'M/D/YYYY')} - ${option.name}`,
      isGroupable: true,
      grouping: {
        categoriesKey: 'eventCategories',
        groupedKey: 'eventsGroupedByCategoryId'
      }
    },
    cellRenderer: asNodeWithEditingProps(MultiSelectCellPresenter)
  },
  {
    label: 'Round',
    dataKey: 'round',
    flexGrow: 6,
    columnData: { optionsKey: 'roundOptions', hasId: true, hasNone: true },
    cellRenderer: asNodeWithEditingProps(DropDownCellPresenter)
  },
  {
    label: 'Enabled',
    dataKey: 'isActive',
    flexGrow: 6,
    cellRenderer: asNodeWithEditingProps(ToggleCellPresenter)
  },
  {
    label: '',
    dataKey: '',
    flexGrow: 12,
    cellRenderer: asNodeWithEditingProps(EditRuleCell)
  },
  {
    label: '',
    dataKey: '',
    flexGrow: 6,
    cellRenderer: asNodeWithEditingProps(DeleteRuleCell)
  }
].map(combineColumnWithDefaults);

const roundOptions = [
  { id: 'Ceil', name: 'Up' },
  { id: 'Floor', name: 'Down' },
  { id: 'Round', name: 'Nearest Dollar' },
  { id: 'None', name: 'No Rounding' }
];

const NoTableRowsText = ({ children }) => (
  <Flex justify="center" align="center" height="100%">
    <Text size={16}>{children}</Text>
  </Flex>
);

type Props = {
  fetchPriceScales: () => EDPriceScale[],
  fetchBuyerTypes: () => EDBuyerType[],
  fetchEventList: () => EDEvent[],
  fetchPriceRules: () => EDPriceRule[],
  fetchEventCategories: () => EDEventCategory[],
  reset: () => void,
  rows: EDPriceRule[],
  events: EDEvent[],
  buyerTypes: EDBuyerType[],
  priceScales: EDPriceScale[],
  eventCategoryMap: any,
  eventCategories: EDEventCategory[],
  eventsGroupedByCategoryId: any
};

export class VirtualizedPricingRulesPresenter extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPriceScales();
    this.props.fetchEventList();
    this.props.fetchPriceRules();
    this.props.fetchEventCategories();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const {
      rows,
      events,
      buyerTypes,
      priceScales,
      eventCategories,
      eventsGroupedByCategoryId
    } = this.props;
    const rowRenderer = withPricingRuleRowStyles(defaultTableRowRenderer);

    // if buyer types cannot be loaded do not display table
    const rowCount = buyerTypes.length > 0 ? rows.length : 0;

    // add padding to the bottom of the table so the
    // drop downs on the last rows do not get cut off
    const tableHeightPadding = 200;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height + tableHeightPadding}
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
                  eventsGroupedByCategoryId
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
  eventCategories: eventCategorySelectors.selectAllEventCategories
});

const mapDispatchToProps = {
  fetchPriceRules: priceRuleActions.fetchPriceRules,
  fetchEventList: eventListActions.fetchEventList,
  reset: priceRuleActions.resetPriceRules,
  fetchPriceScales: priceScaleActions.fetchPriceScales,
  fetchEventCategories: eventCategoryActions.fetchEventCategories
};

export const VirtualizedPricingRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualizedPricingRulesPresenter);
