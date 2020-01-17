// @flow
import saga from './saga';
import type { EDTicketBreakdown } from '_models';

// Action Types
const FETCH = `revenueStat/FETCH`;
const FETCH_ERROR = `revenueStat/FETCH_ERROR`;
const FETCH_SUCCESS = `revenueStat/FETCH_SUCCESS`;
const RESET = `revenueStat/RESET`;

export type FetchStatsAction = {
  type: 'revenueStat/FETCH',
  payload: { seasonId?: number, eventId?: number },
};
export type FetchSuccessAction = {
  type: 'revenueStat/FETCH_SUCCESS',
  payload: EDTicketBreakdown[],
};
export type FetchErrorAction = {
  type: 'revenueStat/FETCH_ERROR',
  payload: Error,
};
export type ResetAction = { type: 'revenueStat/RESET' };

export type Action =
  | FetchStatsAction
  | FetchErrorAction
  | FetchSuccessAction
  | ResetAction;

// Actions
const fetch = (payload: {
  seasonId?: number,
  eventId?: number,
}): FetchStatsAction => ({
  type: FETCH,
  payload,
});
const reset = (): ResetAction => ({ type: RESET });

// InitialState / Reducer
type State = {
  +loading: boolean,
  +ticketBreakdown: EDTicketBreakdown[],
  +error: ?Error,
};

export const initialState: State = {
  loading: false,
  ticketBreakdown: [],
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
        ticketBreakdown: action.payload,
        error: null,
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Selectors
const selectLoading = (store: { revenueStat: State }) =>
  store.revenueStat.loading;
const selectTicketBreakdown = (store: { revenueStat: State }) =>
  store.revenueStat.ticketBreakdown;
const selectError = (store: { revenueStat: State }) => store.revenueStat.error;

// Exports
export const types = { FETCH, FETCH_ERROR, FETCH_SUCCESS, RESET };
export const actions = { fetch, reset };
export const selectors = { selectLoading, selectTicketBreakdown, selectError };
export { saga };
