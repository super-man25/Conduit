// @flow
import type { EDIntegrationStat } from '_models';
import saga from './saga';

// action types
const FETCH = 'ticketIntegration/FETCH';
const FETCH_SUCCESS = 'ticketIntegration/FETCH_SUCCESS';
const FETCH_ERROR = 'ticketIntegration/FETCH_ERROR';

export type FetchAction = {
  type: 'ticketIntegration/FETCH',
  payload: { eventId?: number, seasonId?: number }
};
export type FetchSuccessAction = {
  type: 'ticketIntegration/FETCH_SUCCESS',
  payload: EDIntegrationStat[]
};
export type FetchErrorAction = {
  type: 'ticketIntegration/FETCH_ERROR',
  payload: Error
};

export type Action = FetchAction | FetchSuccessAction | FetchErrorAction;

// actions
const fetchTicketIntegrations = (payload: {
  eventId?: number,
  seasonId?: number
}): FetchAction => ({ type: FETCH, payload });

// reducer/initialState
export type State = {
  +ticketIntegrations: EDIntegrationStat[],
  +loading: boolean,
  +error: ?Error
};

export const initialState = {
  ticketIntegrations: [],
  loading: false,
  error: null
};

type Store = {
  ticketIntegration: State
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, ticketIntegrations: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// selectors
const selectTicketIntegrations = (state: Store) =>
  state.ticketIntegration.ticketIntegrations;
const selectTicketIntegrationsLoading = (state: Store) =>
  state.ticketIntegration.loading;
const selectTicketIntegrationsError = (state: Store) =>
  state.ticketIntegration.error;

// bundled exports - allows doing things like bindActionCreators
export const types = { FETCH, FETCH_SUCCESS, FETCH_ERROR };
export const actions = { fetchTicketIntegrations };
export const selectors = {
  selectTicketIntegrations,
  selectTicketIntegrationsLoading,
  selectTicketIntegrationsError
};
export { saga };
