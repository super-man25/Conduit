// @flow
import { calculateFilteredRows } from './utils';
import { createSelector } from 'reselect';
import type { EDInventoryRow } from '_models';
export { default as saga } from './saga';

// Action Types
const FETCH_EVENT_INVENTORY = 'eventInventory/FETCH_EVENT_INVENTORY';
const FETCH_EVENT_INVENTORY_SUCCESS =
  'eventInventory/FETCH_EVENT_INVENTORY_SUCCESS';
const FETCH_EVENT_INVENTORY_ERROR =
  'eventInventory/FETCH_EVENT_INVENTORY_ERROR';
const SET_EVENT_INVENTORY_FILTER = 'eventInventory/SET_EVENT_INVENTORY_FILTER';
const RESET = 'eventInventory/RESET';
const SET_EVENT_ROW_LISTED_REQUEST =
  'eventInventory/SET_EVENT_ROW_LISTED_REQUEST';
const SET_EVENT_ROW_LISTED_SUCCESS =
  'eventInventory/SET_EVENT_ROW_LISTED_SUCCESS';
const SET_EVENT_ROW_LISTED_ERROR = 'eventInventory/SET_EVENT_ROW_LISTED_ERROR';
const SET_EVENT_ROW_MANUAL_PRICE_REQUEST =
  'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_REQUEST';
const SET_EVENT_ROW_MANUAL_PRICE_SUCCESS =
  'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_SUCCESS';
const SET_EVENT_ROW_MANUAL_PRICE_ERROR =
  'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_ERROR';
const SELECT_EVENT_ROW = 'eventInventory/SELECT_EVENT_ROW';
const SELECT_ALL_EVENT_ROWS = 'eventInventory/SELECT_ALL_EVENT_ROWS';
const SET_EDITING_MANUAL_PRICE = 'eventInventory/SET_EDITING_MANUAL_PRICE';
const CANCEL_EDITING_MANUAL_PRICE =
  'eventInventory/CANCEL_EDITING_MANUAL_PRICE';
const SET_SCALE_FILTERS = 'eventInventory/SET_SCALE_FILTERS';
const CLEAR_SELECTED_SCALE_FILTERS =
  'eventInventory/CLEAR_SELECTED_SCALE_FILTERS';
const SET_SELECTED_SCALE_FILTERS = 'eventInventory/SET_SELECTED_SCALE_FILTERS';

export type FetchEventInventoryAction = {
  type: 'eventInventory/FETCH_EVENT_INVENTORY',
  payload: number
};
export type FetchEventInventorySuccessAction = {
  type: 'eventInventory/FETCH_EVENT_INVENTORY_SUCCESS',
  payload: any
};
export type FetchEventInventoryErrorAction = {
  type: 'eventInventory/FETCH_EVENT_INVENTORY_ERROR',
  payload: Error
};
export type ResetEventInventoryAction = { type: 'eventInventory/RESET' };
export type SetEventInventoryFilterAction = {
  type: 'eventInventory/SET_EVENT_INVENTORY_FILTER',
  payload: string
};
export type SetEventRowListedRequestAction = {
  type: 'eventInventory/SET_EVENT_ROW_LISTED_REQUEST',
  payload: { row: EDInventoryRow, value: boolean }
};
export type SetEventRowListedSuccessAction = {
  type: 'eventInventory/SET_EVENT_ROW_LISTED_SUCCESS',
  payload: { row: EDInventoryRow, value: boolean }
};
export type SetEventRowListedErrorAction = {
  type: 'eventInventory/SET_EVENT_ROW_LISTED_ERROR',
  payload: { row: EDInventoryRow, value: boolean }
};
export type SetEventRowManualPriceRequestAction = {
  type: 'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_REQUEST',
  payload: { row: EDInventoryRow, value: string }
};
export type SetEventRowManualPriceSuccessAction = {
  type: 'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_SUCCESS',
  payload: { row: EDInventoryRow }
};
export type SetEventRowManualPriceErrorAction = {
  type: 'eventInventory/SET_EVENT_ROW_MANUAL_PRICE_ERROR',
  payload: { row: EDInventoryRow, error: Error }
};
export type SelectEventRowAction = {
  type: 'eventInventory/SELECT_EVENT_ROW',
  payload: number
};
export type SelectAllEventRowsAction = {
  type: 'eventInventory/SELECT_ALL_EVENT_ROWS'
};
export type SetEditingManualPriceAction = {
  type: 'eventInventory/SET_EDITING_MANUAL_PRICE',
  payload: number
};
export type CancelEditingManualPriceAction = {
  type: 'eventInventory/CANCEL_EDITING_MANUAL_PRICE'
};
export type SetScaleFiltersAction = {
  type: 'eventInventory/SET_SCALE_FILTERS',
  payload: any[]
};
export type ClearSelectedScaleFiltersAction = {
  type: 'eventInventory/CLEAR_SELECTED_SCALE_FILTERS'
};
export type SetSelectedScaleFiltersAction = {
  type: 'eventInventory/SET_SELECTED_SCALE_FILTERS',
  payload: any[]
};

export type Action =
  | FetchEventInventoryAction
  | FetchEventInventorySuccessAction
  | FetchEventInventoryErrorAction
  | ResetEventInventoryAction
  | SetEventInventoryFilterAction
  | SetEventRowListedRequestAction
  | SetEventRowListedErrorAction
  | SetEventRowManualPriceRequestAction
  | SetEventRowManualPriceErrorAction
  | SelectEventRowAction
  | SelectAllEventRowsAction
  | SetEditingManualPriceAction
  | SetEventRowListedSuccessAction
  | CancelEditingManualPriceAction
  | SetSelectedScaleFiltersAction
  | ClearSelectedScaleFiltersAction
  | SetScaleFiltersAction;

export const types = {
  FETCH_EVENT_INVENTORY,
  FETCH_EVENT_INVENTORY_SUCCESS,
  FETCH_EVENT_INVENTORY_ERROR,
  SET_EVENT_INVENTORY_FILTER,
  RESET,
  SET_EVENT_ROW_LISTED_REQUEST,
  SET_EVENT_ROW_LISTED_SUCCESS,
  SET_EVENT_ROW_LISTED_ERROR,
  SET_EVENT_ROW_MANUAL_PRICE_REQUEST,
  SET_EVENT_ROW_MANUAL_PRICE_SUCCESS,
  SET_EVENT_ROW_MANUAL_PRICE_ERROR,
  SET_EDITING_MANUAL_PRICE,
  SELECT_EVENT_ROW,
  SELECT_ALL_EVENT_ROWS,
  CANCEL_EDITING_MANUAL_PRICE,
  SET_SCALE_FILTERS,
  SET_SELECTED_SCALE_FILTERS,
  CLEAR_SELECTED_SCALE_FILTERS
};

// Actions
const fetchEventInventory = (id: number): FetchEventInventoryAction => ({
  type: FETCH_EVENT_INVENTORY,
  payload: id
});

const resetEventInventory = (): ResetEventInventoryAction => ({ type: RESET });

const setEventInventoryFilter = (
  name: string
): SetEventInventoryFilterAction => ({
  type: SET_EVENT_INVENTORY_FILTER,
  payload: name
});

const setEventRowListed = (
  row: EDInventoryRow,
  value: boolean
): SetEventRowListedRequestAction => ({
  type: SET_EVENT_ROW_LISTED_REQUEST,
  payload: { row, value }
});

const setEventRowManualPrice = (
  row: EDInventoryRow,
  value: string
): SetEventRowManualPriceRequestAction => ({
  type: SET_EVENT_ROW_MANUAL_PRICE_REQUEST,
  payload: { row, value }
});

const selectEventRow = (id: number): SelectEventRowAction => ({
  type: SELECT_EVENT_ROW,
  payload: id
});

const selectAllEventRows = (): SelectAllEventRowsAction => ({
  type: SELECT_ALL_EVENT_ROWS
});

const setEditingManualPrice = (id: number): SetEditingManualPriceAction => ({
  type: SET_EDITING_MANUAL_PRICE,
  payload: id
});

const cancelEditingManualPrice = (): CancelEditingManualPriceAction => ({
  type: CANCEL_EDITING_MANUAL_PRICE
});

const setScaleFilters = (filters: any[]): SetScaleFiltersAction => ({
  type: SET_SCALE_FILTERS,
  payload: filters
});

const clearSelectedScaleFilters = (): ClearSelectedScaleFiltersAction => ({
  type: CLEAR_SELECTED_SCALE_FILTERS
});

const setSelectedScaleFilters = (
  filters: any[]
): SetSelectedScaleFiltersAction => ({
  type: SET_SELECTED_SCALE_FILTERS,
  payload: filters
});

export const actions = {
  fetchEventInventory,
  resetEventInventory,
  setEventInventoryFilter,
  setEventRowListed,
  setEventRowManualPrice,
  selectEventRow,
  selectAllEventRows,
  setEditingManualPrice,
  cancelEditingManualPrice,
  setScaleFilters,
  clearSelectedScaleFilters,
  setSelectedScaleFilters
};

// State/Reducer
type State = {
  allRows: EDInventoryRow[],
  loading: boolean,
  error: ?Error,
  filterDirection: 'asc' | 'desc',
  filterName: string,
  manualPriceEditId: ?number,
  selectedRowIds: number[],
  scaleFilters: number[],
  selectedScaleFilters: number[]
};

export const initialState: State = {
  allRows: [],
  loading: false,
  error: null,
  filterDirection: 'asc',
  filterName: '',
  manualPriceEditId: null,
  selectedRowIds: [],
  scaleFilters: [],
  selectedScaleFilters: []
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT_INVENTORY:
      return { ...state, loading: true };
    case FETCH_EVENT_INVENTORY_SUCCESS:
      return {
        ...state,
        allRows: action.payload,
        loading: false
      };
    case FETCH_EVENT_INVENTORY_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SET_EVENT_INVENTORY_FILTER: {
      const filterName = action.payload;
      let filterDirection;

      if (filterName !== state.filterName) {
        filterDirection = 'asc';
      } else {
        filterDirection = state.filterDirection === 'asc' ? 'desc' : 'asc';
      }

      return {
        ...state,
        filterName,
        filterDirection
      };
    }
    case SELECT_EVENT_ROW: {
      const id = action.payload;
      const selectedRowIds: number[] = state.selectedRowIds.slice();
      const indexOfRowId = selectedRowIds.indexOf(id);

      if (indexOfRowId !== -1) {
        selectedRowIds.splice(indexOfRowId, 1);
      } else {
        selectedRowIds.push(id);
      }

      return {
        ...state,
        selectedRowIds
      };
    }
    case SELECT_ALL_EVENT_ROWS: {
      const rows = calculateFilteredRows(
        state.allRows,
        state.filterDirection,
        state.filterName,
        state.selectedScaleFilters
      );

      const selectedRowIds: number[] =
        rows.length === state.selectedRowIds.length
          ? []
          : rows.map((row) => row.id);

      return {
        ...state,
        selectedRowIds
      };
    }
    case SET_EVENT_ROW_LISTED_REQUEST: {
      const {
        row: { id },
        value
      } = action.payload;

      const allRows: EDInventoryRow[] = state.allRows.map(
        (row) => (row.id === id ? { ...row, isListed: value } : row)
      );

      return {
        ...state,
        allRows
      };
    }
    case SET_EVENT_ROW_LISTED_ERROR: {
      const { row: fallbackRow } = action.payload;
      const id = fallbackRow.id;

      const allRows: EDInventoryRow[] = state.allRows.map(
        (row) => (row.id === id ? { ...fallbackRow } : row)
      );

      return { ...state, allRows };
    }
    case SET_EDITING_MANUAL_PRICE: {
      return { ...state, manualPriceEditId: action.payload };
    }
    case CANCEL_EDITING_MANUAL_PRICE: {
      return { ...state, manualPriceEditId: null };
    }
    case SET_EVENT_ROW_MANUAL_PRICE_REQUEST: {
      const {
        row: { id },
        value
      } = action.payload;

      const allRows: EDInventoryRow[] = state.allRows.map(
        (row) =>
          row.id === id
            ? { ...row, overridePrice: value === '' ? null : Number(value) }
            : row
      );

      return {
        ...state,
        allRows,
        manualPriceEditId: null
      };
    }
    case SET_EVENT_ROW_MANUAL_PRICE_ERROR: {
      const { row: fallbackRow } = action.payload;
      const id = fallbackRow.id;

      const allRows: EDInventoryRow[] = state.allRows.map(
        (row) => (row.id === id ? { ...fallbackRow } : row)
      );

      return { ...state, allRows };
    }
    case SET_SCALE_FILTERS: {
      return {
        ...state,
        scaleFilters: action.payload,
        selectedRowIds: []
      };
    }
    case CLEAR_SELECTED_SCALE_FILTERS: {
      return {
        ...state,
        selectedScaleFilters: [],
        selectedRowIds: []
      };
    }
    case SET_SELECTED_SCALE_FILTERS: {
      return {
        ...state,
        selectedScaleFilters: action.payload,
        selectedRowIds: []
      };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Selectors
type Store = {
  eventInventory: State
};

const selectAllEventInventoryRows = (store: Store) =>
  store.eventInventory.allRows;

const selectSelectedScaleFilters = (store: Store) =>
  store.eventInventory.selectedScaleFilters;

const selectEventInventoryLoading = (store: Store) =>
  store.eventInventory.loading;

const selectEventInventoryError = (store: Store) => store.eventInventory.error;

const selectSelectedRowIds = (store: Store) =>
  store.eventInventory.selectedRowIds;

const selectSelectedRows = createSelector(
  [selectAllEventInventoryRows, selectSelectedRowIds],
  (rows, ids) => {
    return ids.map((id) => rows.find((row) => row.id === id));
  }
);

const selectEventInventoryFilter = (store: Store) => {
  const { eventInventory } = store;
  return {
    name: eventInventory.filterName,
    direction: eventInventory.filterDirection
  };
};

const selectEventInventoryRows = createSelector(
  [
    selectAllEventInventoryRows,
    selectEventInventoryFilter,
    selectSelectedScaleFilters
  ],
  (rows, filters, selectedScaleFilters) =>
    calculateFilteredRows(
      rows,
      filters.direction,
      filters.name,
      selectedScaleFilters
    )
);

export const selectors = {
  selectAllEventInventoryRows,
  selectEventInventoryRows,
  selectEventInventoryLoading,
  selectEventInventoryError,
  selectEventInventoryFilter,
  selectSelectedRowIds,
  selectSelectedRows
};
