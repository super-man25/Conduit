import { formatUSD } from '_helpers/string-utils';
import { defaultCellRenderer } from './CellRenderer';
import { defaultColumnHeaderRenderer } from './ColumnHeaderRenderer';
import { filterColumnHeaderRenderer } from './FilterColumnHeaderRenderer';
import { listedColumnCellRenderer } from './ListedColumnCellRenderer';
import { selectableColumnCellRenderer } from './SelectableCellRenderer';
import { selectableColumnHeaderRenderer } from './SelectableHeaderRenderer';
import { rowControlsCellRenderer } from './RowControlsCellRenderer';

function combineColumnWithDefaults(column) {
  return {
    headerRenderer: defaultColumnHeaderRenderer,
    cellRenderer: defaultCellRenderer,
    width: 0,
    flexGrow: 10,
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
      flexGrow: 5,
      dataKey: '',
      headerRenderer: selectableColumnHeaderRenderer,
      cellRenderer: selectableColumnCellRenderer
    },
    {
      label: 'Scale',
      dataKey: 'priceScaleId',
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
      dataKey: 'section',
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
      dataKey: 'row'
    },
    {
      label: '# of Seats',
      dataKey: 'seats',
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey].length;
      }
    },
    {
      label: 'Price Floor',
      dataKey: 'minimumPrice',
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '--';
      },
      columnData: {
        isEditable: true
      }
    },
    {
      label: 'Price Ceiling',
      dataKey: 'maximumPrice',
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '--';
      },
      columnData: {
        isEditable: true
      }
    },
    {
      label: 'List Price',
      dataKey: 'listedPrice',
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '--';
      }
    },
    {
      label: 'Manual Price',
      dataKey: 'overridePrice',
      cellDataGetter({ columnData, dataKey, rowData }) {
        return rowData[dataKey] !== null ? formatUSD(rowData[dataKey]) : '--';
      },
      columnData: {
        isEditable: true
      }
    },
    {
      label: 'Pricing',
      dataKey: 'isListed',
      cellRenderer: listedColumnCellRenderer
    },
    {
      label: '',
      dataKey: '',
      disableSort: true,
      cellRenderer: rowControlsCellRenderer
    }
  ].map(combineColumnWithDefaults);
};
