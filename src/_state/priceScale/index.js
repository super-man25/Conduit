// @flow
import type { EDPriceScale } from '_models/priceScale';

export { default as saga } from './saga';

const FETCH_PRICE_SCALES = 'priceScale/FETCH_PRICE_SCALES';
const FETCH_PRICE_SCALES_SUCCESS = 'priceScale/FETCH_PRICE_SCALES_SUCCESS';
const FETCH_PRICE_SCALES_ERROR = 'priceScale/FETCH_PRICE_SCALES_ERROR';

// Action types
export type FetchPriceScaleAction = {
  type: 'priceScale/FETCH_PRICE_SCALES'
};

export type FetchPriceScaleSuccessAction = {
  type: 'priceScale/FETCH_PRICE_SCALES_SUCCESS',
  payload: EDPriceScale[]
};

export type FetchPriceScaleErrorAction = {
  type: 'priceScale/FETCH_PRICE_SCALES_ERROR',
  payload: Error
};

export type Action =
  | FetchPriceScaleAction
  | FetchPriceScaleSuccessAction
  | FetchPriceScaleErrorAction;

export const types = {
  FETCH_PRICE_SCALES,
  FETCH_PRICE_SCALES_SUCCESS,
  FETCH_PRICE_SCALES_ERROR
};

// Actions
const fetchPriceScales = (): FetchPriceScaleAction => ({
  type: FETCH_PRICE_SCALES
});

export const actions = {
  fetchPriceScales
};

// State/reducer
type State = {
  priceScales: EDPriceScale[],
  loading: boolean,
  error: ?Error
};

export const initialState: State = {
  priceScales: [],
  loading: false,
  error: null
};

type Store = {
  priceScale: State
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_PRICE_SCALES:
      return { ...state, loading: true };
    case FETCH_PRICE_SCALES_SUCCESS:
      return { ...state, loading: false, priceScales: action.payload };
    case FETCH_PRICE_SCALES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// selectors
const selectAllPriceScales = (store: Store) => store.priceScale.priceScales;
const selectIsLoading = (store: Store) => store.priceScale.loading;

export const selectors = {
  selectAllPriceScales,
  selectIsLoading
};
