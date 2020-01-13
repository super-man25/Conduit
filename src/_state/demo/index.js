// @flow
import saga from './saga';
import type { DemoPriceContext, DemoPriceExample } from '_models';

// Action Types
const FETCH = 'demoPrice/FETCH';
const FETCH_SUCCESS = 'demoPrice/FETCH_SUCCESS';
const FETCH_ERROR = 'demoPrice/FETCH_ERROR';

export type FetchDemoPricesAction = {
  type: 'demoPrice/FETCH',
  payload: { context: DemoPriceContext, examples: Array<DemoPriceExample> },
};
export type FetchDemoPricesSuccessAction = {
  type: 'demoPrice/FETCH_SUCCESS',
  payload: Array<number>,
};
export type FetchDemoPricesErrorAction = {
  type: 'demoPrice/FETCH_ERROR',
  payload: Error,
};

export type Action =
  | FetchDemoPricesAction
  | FetchDemoPricesSuccessAction
  | FetchDemoPricesErrorAction;

// Actions
const fetch = (payload: {
  context: DemoPriceContext,
  examples: Array<DemoPriceExample>,
}): FetchDemoPricesAction => ({
  type: FETCH,
  payload,
});

// InitialState / Reducer
export type State = {
  +loading: boolean,
  +prices: Array<number>,
  +error: ?Error,
};

export const initialState: State = {
  loading: false,
  prices: [],
  error: null,
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        prices: action.payload,
        error: null,
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Selectors
const selectLoading = (store: { demoPrice: State }) => store.demoPrice.loading;
const selectDemoPrices = (store: { demoPrice: State }) =>
  store.demoPrice.prices;
const selectError = (store: { demoPrice: State }) => store.demoPrice.error;

// Exports
export const types = { FETCH, FETCH_ERROR, FETCH_SUCCESS };
export const actions = { fetch };
export const selectors = { selectLoading, selectDemoPrices, selectError };
export { saga };
