// @flow
import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR, RESET } from './actions';
import type { Action } from './actions';

export type TeamStatState = {
  +loading: boolean,
  +allSeasons: Object[],
};

export const initialState: TeamStatState = {
  loading: false,
  allSeasons: [],
};

export default function teamStatReducer(
  state: TeamStatState = initialState,
  action: Action
) {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, allSeasons: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
