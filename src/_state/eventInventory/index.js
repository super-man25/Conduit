// @flow
import { calculateFilteredRows } from './utils';
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
const SET_EVENT_ROW_MANUAL_PRICE = 'eventInventory/SET_EVENT_ROW_MANUAL_PRICE';
const SELECT_EVENT_ROW = 'eventInventory/SELECT_EVENT_ROW';
const SELECT_ALL_EVENT_ROWS = 'eventInventory/SELECT_ALL_EVENT_ROWS';
const SET_EDITING_MANUAL_PRICE = 'eventInventory/SET_EDITING_MANUAL_PRICE';
const CANCEL_EDITING_MANUAL_PRICE =
  'eventInventory/CANCEL_EDITING_MANUAL_PRICE';

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
  payload: { id: number, value: boolean }
};
export type SetEventRowListedSuccessAction = {
  type: 'eventInventory/SET_EVENT_ROW_LISTED_SUCCESS',
  payload: { id: number, value: boolean }
};
export type SetEventRowManualPriceAction = {
  type: 'eventInventory/SET_EVENT_ROW_MANUAL_PRICE',
  payload: { id: number, value: number }
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

export type Action =
  | FetchEventInventoryAction
  | FetchEventInventorySuccessAction
  | FetchEventInventoryErrorAction
  | ResetEventInventoryAction
  | SetEventInventoryFilterAction
  | SetEventRowListedRequestAction
  | SetEventRowManualPriceAction
  | SelectEventRowAction
  | SelectAllEventRowsAction
  | SetEditingManualPriceAction
  | SetEventRowListedSuccessAction
  | CancelEditingManualPriceAction;

export const types = {
  FETCH_EVENT_INVENTORY,
  FETCH_EVENT_INVENTORY_SUCCESS,
  FETCH_EVENT_INVENTORY_ERROR,
  SET_EVENT_INVENTORY_FILTER,
  RESET,
  SET_EVENT_ROW_LISTED_REQUEST,
  SET_EVENT_ROW_LISTED_SUCCESS,
  SET_EVENT_ROW_LISTED_ERROR,
  SET_EVENT_ROW_MANUAL_PRICE,
  SET_EDITING_MANUAL_PRICE,
  SELECT_EVENT_ROW,
  SELECT_ALL_EVENT_ROWS,
  CANCEL_EDITING_MANUAL_PRICE
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
  id: number,
  value: boolean
): SetEventRowListedRequestAction => ({
  type: SET_EVENT_ROW_LISTED_REQUEST,
  payload: { id, value }
});

const setEventRowManualPrice = (
  id: number,
  value: number
): SetEventRowManualPriceAction => ({
  type: SET_EVENT_ROW_MANUAL_PRICE,
  payload: { id, value }
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

export const actions = {
  fetchEventInventory,
  resetEventInventory,
  setEventInventoryFilter,
  setEventRowListed,
  setEventRowManualPrice,
  selectEventRow,
  selectAllEventRows,
  setEditingManualPrice,
  cancelEditingManualPrice
};

// State/Reducer
type State = {
  rows: EDInventoryRow[],
  loading: boolean,
  error: ?Error,
  filterDirection: string,
  filterName: string,
  manualPriceEditId: ?number,
  selectedRowIds: number[]
};

export const initialState: State = {
  rows: [],
  loading: false,
  error: null,
  filterDirection: 'asc',
  filterName: '',
  manualPriceEditId: null,
  selectedRowIds: []
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT_INVENTORY:
      return { ...state, loading: true };
    case FETCH_EVENT_INVENTORY_SUCCESS:
      return { ...state, rows: action.payload, loading: false };
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
        filterDirection,
        rows: calculateFilteredRows(state.rows, filterDirection, filterName)
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
      const selectedRowIds: number[] =
        state.rows.length === state.selectedRowIds.length
          ? []
          : state.rows.map((row) => row.id);

      return {
        ...state,
        selectedRowIds
      };
    }
    case SET_EVENT_ROW_LISTED_SUCCESS: {
      const { id, value } = action.payload;
      const { rows } = state;

      const indexOfRow = rows.findIndex((row) => row.id === id);

      const updatedRow = {
        ...rows[indexOfRow],
        isListed: value
      };

      const updatedRows = [
        ...rows.slice(0, indexOfRow),
        updatedRow,
        ...rows.slice(indexOfRow + 1)
      ];

      return { ...state, rows: updatedRows };
    }
    case SET_EDITING_MANUAL_PRICE: {
      return { ...state, manualPriceEditId: action.payload };
    }
    case CANCEL_EDITING_MANUAL_PRICE: {
      return { ...state, manualPriceEditId: null };
    }
    case SET_EVENT_ROW_MANUAL_PRICE: {
      const { id, value } = action.payload;
      const { rows } = state;

      const indexOfRow = rows.findIndex((row) => row.id === id);

      const updatedRow = {
        ...rows[indexOfRow],
        overridePrice: value === '' ? null : Number(value)
      };

      const updatedRows = [
        ...rows.slice(0, indexOfRow),
        updatedRow,
        ...rows.slice(indexOfRow + 1)
      ];

      return { ...state, rows: updatedRows, manualPriceEditId: null };
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

const selectEventInventoryRows = (store: Store) => store.eventInventory.rows;
const selectEventInventoryLoading = (store: Store) =>
  store.eventInventory.loading;
const selectEventInventoryError = (store: Store) => store.eventInventory.error;
const selectEventInventoryFilter = (store: Store) => {
  const { eventInventory } = store;
  return {
    name: eventInventory.filterName,
    direction: eventInventory.filterDirection
  };
};

export const selectors = {
  selectEventInventoryRows,
  selectEventInventoryLoading,
  selectEventInventoryError,
  selectEventInventoryFilter
};
