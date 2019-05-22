import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { defaultCellRenderer } from './CellRenderer';
import { filterColumnHeaderRenderer } from './FilterColumnHeaderRenderer';
import { formatUSD } from '_helpers/string-utils';
import { listedColumnCellRenderer } from './ListedColumnCellRenderer';
import { manualPricingColumnCellRenderer } from './ManualPricingColumnCellRenderer';
import { selectableColumnCellRenderer } from './SelectableCellRenderer';
import { selectableColumnHeaderRenderer } from './SelectableHeaderRenderer';

function combineColumnWithDefaults(column) {
  return {
    headerRenderer: defaultColumnHeaderRenderer,
    cellRenderer: defaultCellRenderer,
    ...column
  };
}

export const getInventoryColumns = function(props) {
  const {
    clearScaleFilters,
    clearSectionFilters,
    filter,
    priceScales,
    sections,
    selectedScaleFilters,
    selectedSectionFilters,
    setEventInventoryFilter,
    setSelectedScaleFilters,
    setSelectedSectionFilters
  } = props;

  return [
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
      headerRenderer: (props) =>
        filterColumnHeaderRenderer(
          props,
          priceScales,
          selectedScaleFilters,
          filter,
          setEventInventoryFilter,
          clearScaleFilters,
          setSelectedScaleFilters
        ),
      cellDataGetter({ columnData, dataKey, rowData }) {
        const priceScale = columnData.priceScales.find(
          (priceScale) => priceScale.id === rowData[dataKey]
        );

        if (!priceScale) return '';
        return priceScale.name;
      }
    },
    {
      label: 'Section',
      width: 0,
      dataKey: 'section',
      flexGrow: 10,
      headerRenderer: (props) =>
        filterColumnHeaderRenderer(
          props,
          sections,
          selectedSectionFilters,
          filter,
          setEventInventoryFilter,
          clearSectionFilters,
          setSelectedSectionFilters
        )
    },
    {
      label: 'Row',
      width: 0,
      dataKey: 'row',
      flexGrow: 5
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
      label: 'Price Floor',
      width: 0,
      dataKey: 'minimumPrice',
      flexGrow: 10,
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '---';
      }
    },
    {
      label: 'Price Ceiling',
      width: 0,
      dataKey: 'maximumPrice',
      flexGrow: 10,
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '---';
      }
    },
    {
      label: 'List Price',
      width: 0,
      dataKey: 'listedPrice',
      flexGrow: 10,
      cellDataGetter({ columnData, dataKey, rowData }) {
        return formatUSD(rowData[dataKey]);
      }
    },
    {
      label: 'Pricing',
      width: 0,
      dataKey: 'isListed',
      flexGrow: 10,
      cellRenderer: listedColumnCellRenderer
    },
    {
      label: 'Manual Pricing',
      width: 0,
      dataKey: 'overridePrice',
      flexGrow: 15,
      disableSort: true,
      cellRenderer: manualPricingColumnCellRenderer
    }
  ].map(combineColumnWithDefaults);
};
