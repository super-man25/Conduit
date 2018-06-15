// @flow
import { RESET, FETCH_SUCCESS, FETCH_ERROR, FETCH } from './actions';
import type { Action } from './actions';
import type { EDTicketBreakdown } from '_models';

export type State = {
  +loading: boolean,
  +ticketBreakdown: EDTicketBreakdown[],
  +error?: any
};

export const initialState: State = {
  loading: false,
  ticketBreakdown: [],
  error: null
};

export default function revenueStatReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        ticketBreakdown: action.payload,
        error: null
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
