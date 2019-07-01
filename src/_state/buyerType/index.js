// @flow
import type { EDBuyerType } from '_models/buyerType';

export { default as saga } from './saga';

const FETCH_BUYER_TYPES = 'buyerType/FETCH_BUYER_TYPES';
const FETCH_BUYER_TYPES_SUCCESS = 'buyerType/FETCH_BUYER_TYPES_SUCCESS';
const FETCH_BUYER_TYPES_ERROR = 'buyerType/FETCH_BUYER_TYPES_ERROR';
const UPDATE_BUYER_TYPES = 'buyerType/UPDATE_BUYER_TYPES';
const UPDATE_BUYER_TYPES_SUCCESS = 'buyerType/UPDATE_BUYER_TYPES_SUCCESS';
const UPDATE_BUYER_TYPES_ERROR = 'buyerType/UPDATE_BUYER_TYPES_ERROR';

// Action types
export type FetchBuyerTypesAction = {
  type: 'buyerType/FETCH_BUYER_TYPES'
};

export type FetchBuyerTypesSuccessAction = {
  type: 'buyerType/FETCH_BUYER_TYPES_SUCCESS',
  payload: EDBuyerType[]
};

export type FetchBuyerTypesErrorAction = {
  type: 'buyerType/FETCH_BUYER_TYPES_ERROR',
  payload: Error
};

export type UpdateBuyerTypesAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES',
  payload: any
};

export type UpdateBuyerTypesSuccessAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES_SUCCESS',
  payload: number
};

export type UpdateBuyerTypeErrorAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES_ERROR',
  payload: Error
};

export type Action =
  | FetchBuyerTypesAction
  | FetchBuyerTypesSuccessAction
  | FetchBuyerTypesErrorAction
  | UpdateBuyerTypesAction
  | UpdateBuyerTypesSuccessAction
  | UpdateBuyerTypeErrorAction;

export const types = {
  FETCH_BUYER_TYPES,
  FETCH_BUYER_TYPES_SUCCESS,
  FETCH_BUYER_TYPES_ERROR,
  UPDATE_BUYER_TYPES,
  UPDATE_BUYER_TYPES_SUCCESS,
  UPDATE_BUYER_TYPES_ERROR
};

// Actions
const fetchBuyerTypes = (): FetchBuyerTypesAction => ({
  type: FETCH_BUYER_TYPES
});

const updateBuyerTypes = (
  buyerTypes: EDBuyerType[]
): UpdateBuyerTypesAction => ({
  type: UPDATE_BUYER_TYPES,
  payload: buyerTypes
});

export const actions = {
  fetchBuyerTypes,
  updateBuyerTypes
};

// State/reducer
type State = {
  buyerTypes: EDBuyerType[],
  loading: boolean,
  error: ?Error
};

export const initialState: State = {
  buyerTypes: [],
  loading: false,
  error: null
};

type Store = {
  buyerType: State
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_BUYER_TYPES:
      return { ...state, error: null, loading: true };
    case FETCH_BUYER_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        buyerTypes: action.payload
      };
    case FETCH_BUYER_TYPES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_BUYER_TYPES:
      return { ...state, loading: true };
    case UPDATE_BUYER_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case UPDATE_BUYER_TYPES_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// selectors
const selectAllBuyerTypes = (store: Store) => store.buyerType.buyerTypes;
const selectIsLoading = (store: Store) => store.buyerType.loading;
const selectError = (store: Store) => store.buyerType.error;

export const selectors = {
  selectAllBuyerTypes,
  selectIsLoading,
  selectError
};
