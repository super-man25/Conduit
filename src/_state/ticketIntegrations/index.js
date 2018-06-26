// @flow
import type { EDIntegrationStat } from '_models';
import saga from './saga';
import { createActionTypeCreator } from '_helpers';

const reducerName = 'ticketIntegration';
const createActionType = createActionTypeCreator(reducerName);

// reducer/initialState
export type State = {
  ticketIntegrations: EDIntegrationStat[],
  loading: boolean,
  error: ?Error
};

export const initialState = {
  ticketIntegrations: [],
  loading: false,
  error: null
};

type Store = {
  ticketIntegration: State
};

export default function reducer(state: State = initialState, action = {}) {
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
  state[reducerName].ticketIntegrations;
const selectTicketIntegrationsLoading = (state: Store) =>
  state[reducerName].loading;
const selectTicketIntegrationsError = (state: Store) =>
  state[reducerName].error;

// action types
const FETCH = createActionType('FETCH');
const FETCH_SUCCESS = createActionType('FETCH_SUCCESS');
const FETCH_ERROR = createActionType('FETCH_ERROR');

// actions
const fetchTicketIntegrations = () => ({ type: FETCH });

// bundled exports - allows doing things like bindActionCreators
export const types = { FETCH, FETCH_SUCCESS, FETCH_ERROR };
export const actions = { fetchTicketIntegrations };
export const selectors = {
  selectTicketIntegrations,
  selectTicketIntegrationsLoading,
  selectTicketIntegrationsError
};
export { saga };
