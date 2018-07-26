// @flow
const START_BULK_UPDATE = 'eventInventoryBulk/START_BULK_UPDATE';
const CANCEL_BULK_UPDATE = 'eventInventoryBulk/CANCEL_BULK_UPDATE';
const SUBMIT_BULK_UPDATE = 'eventInventoryBulk/SUBMIT_BULK_UPDATE';
const SUBMIT_BULK_UPDATE_SUCCESS =
  'eventInventoryBulk/SUBMIT_BULK_UPDATE_SUCCESS';
const SUBMIT_BULK_UPDATE_ERROR = 'eventInventoryBulk/SUBMIT_BULK_UPDATE_ERROR';

export type StartBulkUpdateAction = {
  type: 'eventInventoryBulk/START_BULK_UPDATE'
};
export type CancelBulkUpdateAction = {
  type: 'eventInventoryBulk/CANCEL_BULK_UPDATE'
};
export type SubmitBulkUpdateAction = {
  type: 'eventInventoryBulk/SUBMIT_BULK_UPDATE',
  payload: {
    isListed?: boolean,
    overridePrice?: number
  }
};
export type SubmitBulkUpdateSuccessAction = {
  type: 'eventInventoryBulk/SUBMIT_BULK_UPDATE_SUCCESS'
};
export type SubmitBulkUpdateErrorAction = {
  type: 'eventInventoryBulk/SUBMIT_BULK_UPDATE_ERROR',
  payload: Error
};

export type Action =
  | StartBulkUpdateAction
  | CancelBulkUpdateAction
  | SubmitBulkUpdateAction
  | SubmitBulkUpdateSuccessAction
  | SubmitBulkUpdateErrorAction;

export const types = {
  START_BULK_UPDATE,
  CANCEL_BULK_UPDATE,
  SUBMIT_BULK_UPDATE,
  SUBMIT_BULK_UPDATE_SUCCESS,
  SUBMIT_BULK_UPDATE_ERROR
};

const startBulkUpdate = (): StartBulkUpdateAction => ({
  type: START_BULK_UPDATE
});

const cancelBulkUpdate = (): CancelBulkUpdateAction => ({
  type: CANCEL_BULK_UPDATE
});

const submitBulkUpdate = (payload: {
  isListed?: boolean,
  overridePrice?: number
}): SubmitBulkUpdateAction => ({
  type: SUBMIT_BULK_UPDATE,
  payload
});

export const actions = {
  startBulkUpdate,
  cancelBulkUpdate,
  submitBulkUpdate
};

type State = {
  isBulkUpdating: boolean,
  loading: boolean,
  error: ?Error
};

export const initialState: State = {
  isBulkUpdating: false,
  loading: false,
  error: null
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case START_BULK_UPDATE: {
      return { ...state, isBulkUpdating: true };
    }
    case CANCEL_BULK_UPDATE: {
      return { ...state, isBulkUpdating: false };
    }
    case SUBMIT_BULK_UPDATE: {
      return { ...state, loading: true };
    }
    case SUBMIT_BULK_UPDATE_SUCCESS: {
      return { ...state, loading: false, isBulkUpdating: false };
    }
    case SUBMIT_BULK_UPDATE_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Selectors
type Store = {
  eventInventoryBulk: State
};

const isBulkUpdating = (store: Store) =>
  store.eventInventoryBulk.isBulkUpdating;
const isLoading = (store: Store) => store.eventInventoryBulk.loading;
const hasError = (store: Store) => store.eventInventoryBulk.error;

export const selectors = {
  isBulkUpdating,
  isLoading,
  hasError
};

export { default as saga } from './saga';
