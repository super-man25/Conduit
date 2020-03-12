import React from 'react';
import { format, parseISO } from 'date-fns';

import { Text } from '_components';
import { formatUSD, compare } from '_helpers/string-utils';
import { DefaultCellPresenter } from './CellRenderer';
import { withEditingProps } from './withEditingProps';
import { MultiSelectCellPresenter } from './MultiSelectCellRenderer';
import { DropdownCellPresenter } from './DropdownCellRenderer';
import { ToggleCellRenderer } from './ToggleCellRenderer';
import { RuleControlsCell } from './RuleControlsCellRenderer';
import { CheckboxCellRenderer } from './CheckboxCellRenderer';

function combineColumnWithDefaults(column) {
  return {
    cellRenderer: asNodeWithEditingProps(DefaultCellPresenter),
    width: 0,
    flexGrow: 10,
    ...column,
  };
}

const asNodeWithEditingProps = (CellPresenter) => {
  const CellRenderer = withEditingProps(CellPresenter);
  return (props) => {
    return <CellRenderer {...props} />;
  };
};

export const pricingRulesTableColumns = [
  {
    label: '',
    dataKey: '',
    maxWidth: 20,
    cellRenderer: CheckboxCellRenderer,
  },
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
    cellRenderer: asNodeWithEditingProps(DropdownCellPresenter),
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
        option &&
        `${format(parseISO(option.timestamp), 'M/d/yyyy')} - ${option.name}`,
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
    cellRenderer: asNodeWithEditingProps(DropdownCellPresenter),
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
    cellRenderer: asNodeWithEditingProps(ToggleCellRenderer),
  },
  {
    label: '',
    dataKey: '',
    minWidth: 125,
    cellRenderer: asNodeWithEditingProps(RuleControlsCell),
  },
].map(combineColumnWithDefaults);
