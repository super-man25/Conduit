// @flow
import type { EDBuyerType } from '_models/buyerType';

export { default as saga } from './saga';

const FETCH_BUYER_TYPES = 'buyerType/FETCH_BUYER_TYPES';
const FETCH_BUYER_TYPES_SUCCESS = 'buyerType/FETCH_BUYER_TYPES_SUCCESS';
const FETCH_BUYER_TYPES_ERROR = 'buyerType/FETCH_BUYER_TYPES_ERROR';

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

export type Action =
  | FetchBuyerTypesAction
  | FetchBuyerTypesSuccessAction
  | FetchBuyerTypesErrorAction;

export const types = {
  FETCH_BUYER_TYPES,
  FETCH_BUYER_TYPES_SUCCESS,
  FETCH_BUYER_TYPES_ERROR
};

// Actions
const fetchBuyerTypes = (): FetchBuyerTypesAction => ({
  type: FETCH_BUYER_TYPES
});

export const actions = {
  fetchBuyerTypes
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
      return { ...state, loading: true };
    case FETCH_BUYER_TYPES_SUCCESS:
      return { ...state, loading: false, buyerTypes: action.payload };
    case FETCH_BUYER_TYPES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// selectors
const selectAllBuyerTypes = (store: Store) => store.buyerType.buyerTypes;

export const selectors = {
  selectAllBuyerTypes
};
