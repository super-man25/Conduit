// @flow
import { createSelector } from 'reselect';

import type {
  EDInventorySectionFilter,
  EDInventoryRow,
  EDVenuePriceScale,
  EDSectionsToPriceScale
} from '_models';
import {
  calculateFilteredRows,
  getSectionsByScaleFilter,
  getScalesBySectionFilter
} from './utils';
export { default as saga } from './saga';

// Action Types
const FETCH_EVENT_INVENTORY = 'eventInventory/FETCH_EVENT_INVENTORY';
const FETCH_EVENT_INVENTORY_SUCCESS =
  'eventInventory/FETCH_EVENT_INVENTORY_SUCCESS';
const FETCH_EVENT_INVENTORY_ERROR =
  'eventInventory/FETCH_EVENT_INVENTORY_ERROR';
const START_EDITING_ROW = 'eventInventory/START_EDITING_ROW';
const CANCEL_EDITING_ROW = 'eventInventory/CANCEL_EDITING_ROW';
const UPDATE_EDITED_ROW_PROPERTY = 'eventInventory/UPDATE_EDITED_ROW_PROPERTY';
const SAVE_EDITED_ROW = 'eventInventory/SAVE_EDITED_ROW';
const SAVE_EDITED_ROW_SUCCESS = 'eventInventory/SAVE_EDITED_ROW_SUCCESS';
const SAVE_EDITED_ROW_ERROR = 'eventInventory/SAVE_EDITED_ROW_ERROR';
const SET_EVENT_INVENTORY_FILTER = 'eventInventory/SET_EVENT_INVENTORY_FILTER';
const SET_EVENT_ROW_LISTED_REQUEST =
  'eventInventory/SET_EVENT_ROW_LISTED_REQUEST';
const SET_EVENT_ROW_LISTED_SUCCESS =
  'eventInventory/SET_EVENT_ROW_LISTED_SUCCESS';
const SET_EVENT_ROW_LISTED_ERROR = 'eventInventory/SET_EVENT_ROW_LISTED_ERROR';
const SELECT_EVENT_ROW = 'eventInventory/SELECT_EVENT_ROW';
const SELECT_ALL_EVENT_ROWS = 'eventInventory/SELECT_ALL_EVENT_ROWS';
const SET_SCALE_FILTERS = 'eventInventory/SET_SCALE_FILTERS';
const CLEAR_SELECTED_SCALE_FILTERS =
  'eventInventory/CLEAR_SELECTED_SCALE_FILTERS';
const SET_SELECTED_SCALE_FILTERS = 'eventInventory/SET_SELECTED_SCALE_FILTERS';
const SET_SECTION_FILTERS = 'eventInventory/SET_SECTION_FILTERS';
const SET_SELECTED_SECTION_FILTERS =
  'eventInventory/SET_SELECTED_SECTION_FILTERS';
const CLEAR_SELECTED_SECTION_FILTERS =
  'eventInventory/CLEAR_SELECTED_SECTION_FILTERS';
const SET_SECTIONS_TO_PRICE_SCALE =
  'eventInventory/SET_SECTIONS_TO_PRICE_SCALE';
const RESET = 'eventInventory/RESET';

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
export type StartEditingRowAction = {
  type: 'eventInventory/START_EDITING_ROW',
  payload: number
};
export type CancelEditingRowAction = {
  type: 'eventInventory/CANCEL_EDITING_ROW'
};
export type UpdateEditedRowPropertyAction = {
  type: 'eventInventory/UPDATE_EDITED_ROW_PROPERTY',
  payload: any
};
export type SaveEditedRowAction = {
  type: 'eventInventory/SAVE_EDITED_ROW'
};
export type SaveEditedRowSuccessAction = {
  type: 'eventInventory/SAVE_EDITED_ROW_SUCCESS',
  payload: { row: EDInventoryRow }
};
export type SaveEditedRowErrorAction = {
  type: 'eventInventory/SAVE_EDITED_ROW_ERROR',
  payload: { row: EDInventoryRow, error: Error }
};
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
export type SelectEventRowAction = {
  type: 'eventInventory/SELECT_EVENT_ROW',
  payload: number
};
export type SelectAllEventRowsAction = {
  type: 'eventInventory/SELECT_ALL_EVENT_ROWS'
};
export type SetScaleFiltersAction = {
  type: 'eventInventory/SET_SCALE_FILTERS',
  payload: EDVenuePriceScale[]
};
export type ClearSelectedScaleFiltersAction = {
  type: 'eventInventory/CLEAR_SELECTED_SCALE_FILTERS'
};
export type SetSelectedScaleFiltersAction = {
  type: 'eventInventory/SET_SELECTED_SCALE_FILTERS',
  payload: EDVenuePriceScale[]
};
export type SetSectionFiltersAction = {
  type: 'eventInventory/SET_SECTION_FILTERS',
  payload: EDInventorySectionFilter[]
};
export type SetSelectedSectionFiltersAction = {
  type: 'eventInventory/SET_SELECTED_SECTION_FILTERS',
  payload: EDInventorySectionFilter[]
};
export type ClearSelectedSectionFiltersAction = {
  type: 'eventInventory/CLEAR_SELECTED_SECTION_FILTERS'
};
export type SetSectionsToPriceScaleAction = {
  type: 'eventInventory/SET_SECTIONS_TO_PRICE_SCALE',
  payload: EDSectionsToPriceScale[]
};
export type ResetEventInventoryAction = { type: 'eventInventory/RESET' };

export type Action =
  | FetchEventInventoryAction
  | FetchEventInventorySuccessAction
  | FetchEventInventoryErrorAction
  | StartEditingRowAction
  | CancelEditingRowAction
  | UpdateEditedRowPropertyAction
  | SaveEditedRowAction
  | SaveEditedRowSuccessAction
  | SaveEditedRowErrorAction
  | SetEventInventoryFilterAction
  | SetEventRowListedRequestAction
  | SetEventRowListedErrorAction
  | SelectEventRowAction
  | SelectAllEventRowsAction
  | SetEventRowListedSuccessAction
  | SetSelectedScaleFiltersAction
  | ClearSelectedScaleFiltersAction
  | SetScaleFiltersAction
  | SetSectionFiltersAction
  | SetSelectedSectionFiltersAction
  | ClearSelectedSectionFiltersAction
  | SetSectionsToPriceScaleAction
  | ResetEventInventoryAction;

export const types = {
  FETCH_EVENT_INVENTORY,
  FETCH_EVENT_INVENTORY_SUCCESS,
  FETCH_EVENT_INVENTORY_ERROR,
  START_EDITING_ROW,
  CANCEL_EDITING_ROW,
  UPDATE_EDITED_ROW_PROPERTY,
  SAVE_EDITED_ROW,
  SAVE_EDITED_ROW_SUCCESS,
  SAVE_EDITED_ROW_ERROR,
  SET_EVENT_INVENTORY_FILTER,
  SET_EVENT_ROW_LISTED_REQUEST,
  SET_EVENT_ROW_LISTED_SUCCESS,
  SET_EVENT_ROW_LISTED_ERROR,
  SELECT_EVENT_ROW,
  SELECT_ALL_EVENT_ROWS,
  SET_SCALE_FILTERS,
  SET_SELECTED_SCALE_FILTERS,
  CLEAR_SELECTED_SCALE_FILTERS,
  SET_SECTION_FILTERS,
  SET_SELECTED_SECTION_FILTERS,
  CLEAR_SELECTED_SECTION_FILTERS,
  SET_SECTIONS_TO_PRICE_SCALE,
  RESET
};

// Actions
const fetchEventInventory = (id: number): FetchEventInventoryAction => ({
  type: FETCH_EVENT_INVENTORY,
  payload: id
});

const startEditingRow = (id: number): StartEditingRowAction => {
  return {
    type: START_EDITING_ROW,
    payload: id
  };
};

const cancelEditingRow = (): CancelEditingRowAction => {
  return {
    type: CANCEL_EDITING_ROW
  };
};

const updateEditedRowProperty = (
  payload: any
): UpdateEditedRowPropertyAction => {
  return {
    type: UPDATE_EDITED_ROW_PROPERTY,
    payload
  };
};

const saveEditedRow = (): SaveEditedRowAction => {
  return {
    type: SAVE_EDITED_ROW
  };
};

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

const selectEventRow = (id: number): SelectEventRowAction => ({
  type: SELECT_EVENT_ROW,
  payload: id
});

const selectAllEventRows = (): SelectAllEventRowsAction => ({
  type: SELECT_ALL_EVENT_ROWS
});

const setScaleFilters = (
  filters: EDVenuePriceScale[]
): SetScaleFiltersAction => ({
  type: SET_SCALE_FILTERS,
  payload: filters
});

const clearSelectedScaleFilters = (): ClearSelectedScaleFiltersAction => ({
  type: CLEAR_SELECTED_SCALE_FILTERS
});

const setSelectedScaleFilters = (
  filters: EDVenuePriceScale[]
): SetSelectedScaleFiltersAction => ({
  type: SET_SELECTED_SCALE_FILTERS,
  payload: filters
});

const setSectionFilters = (
  filters: EDInventorySectionFilter[]
): SetSectionFiltersAction => ({
  type: SET_SECTION_FILTERS,
  payload: filters
});

const setSelectedSectionFilters = (
  filters: EDInventorySectionFilter[]
): SetSelectedSectionFiltersAction => ({
  type: SET_SELECTED_SECTION_FILTERS,
  payload: filters
});

const clearSelectedSectionFilters = (): ClearSelectedSectionFiltersAction => ({
  type: CLEAR_SELECTED_SECTION_FILTERS
});

const setSectionsToPriceScaleAction = (
  sectionsToPriceScale: EDSectionsToPriceScale
): SetSectionsToPriceScaleAction => ({
  type: SET_SECTIONS_TO_PRICE_SCALE,
  payload: sectionsToPriceScale
});

const resetEventInventory = (): ResetEventInventoryAction => ({ type: RESET });

export const actions = {
  fetchEventInventory,
  startEditingRow,
  cancelEditingRow,
  updateEditedRowProperty,
  saveEditedRow,
  setEventRowListed,
  selectEventRow,
  selectAllEventRows,
  setEventInventoryFilter,
  setScaleFilters,
  clearSelectedScaleFilters,
  setSelectedScaleFilters,
  setSectionFilters,
  setSelectedSectionFilters,
  clearSelectedSectionFilters,
  setSectionsToPriceScaleAction,
  resetEventInventory
};

// State/Reducer
export type State = {
  allRows: EDInventoryRow[],
  loading: boolean,
  error: ?Error,
  filterDirection: 'asc' | 'desc',
  filterName: string,
  editedRowId: ?number,
  editedRowState: ?any,
  selectedRowIds: number[],
  scaleFilters: number[],
  selectedScaleFilters: EDVenuePriceScale[],
  sectionFilters: EDInventorySectionFilter[],
  selectedSectionFilters: EDInventorySectionFilter[],
  sectionsToPriceScale: EDSectionsToPriceScale[]
};

export const initialState: State = {
  allRows: [],
  loading: false,
  error: null,
  filterDirection: 'asc',
  filterName: '',
  editedRowId: null,
  editedRowState: {},
  selectedRowIds: [],
  scaleFilters: [],
  selectedScaleFilters: [],
  sectionFilters: [],
  selectedSectionFilters: [],
  sectionsToPriceScale: []
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
    case START_EDITING_ROW:
      return {
        ...state,
        editedRowId: action.payload,
        editedRowState: state.allRows.find((row) => row.id === action.payload)
      };
    case CANCEL_EDITING_ROW:
      // if (action.payload === 0) {
      //   return {
      //     ...state,
      //     editedRowId: null,
      //     editedRowState: {},
      //     error: null,
      //     allRows: state.allRows.slice(1)
      //   };
      // }
      return {
        ...state,
        editedRowId: null,
        editedRowState: {},
        error: null
      };
    case UPDATE_EDITED_ROW_PROPERTY:
      const { propertyName, propertyValue } = action.payload;
      return {
        ...state,
        editedRowState: {
          ...state.editedRowState,
          [propertyName]: propertyValue
        }
      };
    case SAVE_EDITED_ROW:
      return {
        ...state,
        loading: true
      };
    case SAVE_EDITED_ROW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };
    case SAVE_EDITED_ROW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
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
        state.scaleFilters,
        state.selectedSectionFilters
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

      const allRows: EDInventoryRow[] = state.allRows.map((row) =>
        row.id === id ? { ...row, isListed: value } : row
      );

      return {
        ...state,
        allRows
      };
    }
    case SET_EVENT_ROW_LISTED_ERROR: {
      const { row: fallbackRow } = action.payload;
      const id = fallbackRow.id;

      const allRows: EDInventoryRow[] = state.allRows.map((row) =>
        row.id === id ? { ...fallbackRow } : row
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
        selectedSectionFilters: getSectionsByScaleFilter(state, []),
        selectedRowIds: []
      };
    }
    case SET_SELECTED_SCALE_FILTERS: {
      return {
        ...state,
        selectedScaleFilters: action.payload,
        selectedSectionFilters: getSectionsByScaleFilter(state, action.payload),
        selectedRowIds: []
      };
    }
    case SET_SECTION_FILTERS: {
      return {
        ...state,
        sectionFilters: action.payload,
        selectedRowIds: []
      };
    }
    case SET_SELECTED_SECTION_FILTERS: {
      return {
        ...state,
        selectedSectionFilters: action.payload,
        selectedScaleFilters: getScalesBySectionFilter(state, action.payload),
        selectedRowIds: []
      };
    }
    case CLEAR_SELECTED_SECTION_FILTERS: {
      return {
        ...state,
        selectedSectionFilters: [],
        selectedScaleFilters: [],
        selectedRowIds: []
      };
    }
    case SET_SECTIONS_TO_PRICE_SCALE: {
      return {
        ...state,
        sectionsToPriceScale: action.payload
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

const selectEditedRowId = (store: Store) => store.eventInventory.editedRowId;

const selectEditedRowState = (store: Store) =>
  store.eventInventory.editedRowState;

const selectEditedRowSeatIds = (store: Store) => {
  const rowSeats = store.eventInventory.allRows.find(
    (row: EDInventoryRow) => row.id === store.eventInventory.editedRowId
  );
  if (rowSeats) {
    return rowSeats.seats;
  }
};

const selectScaleFilters = (store: Store) => store.eventInventory.scaleFilters;

const selectSectionFilters = (store: Store) =>
  store.eventInventory.sectionFilters;

const selectSelectedSectionFilters = (store: Store) =>
  store.eventInventory.selectedSectionFilters;

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
    selectScaleFilters,
    selectSelectedSectionFilters
  ],
  (rows, filters, scaleFilters, selectSelectedSectionFilters) =>
    calculateFilteredRows(
      rows,
      filters.direction,
      filters.name,
      scaleFilters,
      selectSelectedSectionFilters
    )
);

export const selectors = {
  selectAllEventInventoryRows,
  selectEventInventoryRows,
  selectEditedRowId,
  selectEditedRowState,
  selectEditedRowSeatIds,
  selectEventInventoryLoading,
  selectEventInventoryError,
  selectEventInventoryFilter,
  selectScaleFilters,
  selectSelectedScaleFilters,
  selectSelectedRowIds,
  selectSelectedRows,
  selectSectionFilters,
  selectSelectedSectionFilters
};
