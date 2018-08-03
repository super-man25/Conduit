// @flow

export const types = {
  START_BULK_UPDATE: 'eventInventoryBulk/START_BULK_UPDATE',
  CANCEL_BULK_UPDATE: 'eventInventoryBulk/CANCEL_BULK_UPDATE',
  SUBMIT_BULK_UPDATE: 'eventInventoryBulk/SUBMIT_BULK_UPDATE',
  SUBMIT_BULK_UPDATE_SUCCESS: 'eventInventoryBulk/SUBMIT_BULK_UPDATE_SUCCESS',
  SUBMIT_BULK_UPDATE_ERROR: 'eventInventoryBulk/SUBMIT_BULK_UPDATE_ERROR'
};

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

export const actions = {
  startBulkUpdate: (): StartBulkUpdateAction => ({
    type: types.START_BULK_UPDATE
  }),

  cancelBulkUpdate: (): CancelBulkUpdateAction => ({
    type: types.CANCEL_BULK_UPDATE
  }),

  submitBulkUpdate: (payload: {
    isListed?: boolean,
    overridePrice?: number
  }): SubmitBulkUpdateAction => ({
    type: types.SUBMIT_BULK_UPDATE,
    payload
  })
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
    case types.START_BULK_UPDATE: {
      return { ...state, isBulkUpdating: true };
    }
    case types.CANCEL_BULK_UPDATE: {
      return { ...state, isBulkUpdating: false };
    }
    case types.SUBMIT_BULK_UPDATE: {
      return { ...state, loading: true };
    }
    case types.SUBMIT_BULK_UPDATE_SUCCESS: {
      return { ...state, loading: false, isBulkUpdating: false };
    }
    case types.SUBMIT_BULK_UPDATE_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

type Store = {
  eventInventoryBulk: State
};

export const selectors = {
  isBulkUpdating: (store: Store) => store.eventInventoryBulk.isBulkUpdating,
  isLoading: (store: Store) => store.eventInventoryBulk.loading,
  getError: (store: Store) => store.eventInventoryBulk.error
};

export { default as saga } from './saga';
