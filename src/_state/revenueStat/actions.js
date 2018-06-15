// @flow
// Constants
export const FETCH = 'revenueStat/FETCH';
export const FETCH_ERROR = 'revenueStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'revenueStat/FETCH_SUCCESS';
export const RESET = 'revenueStat/RESET';

type FetchStatsAction = { type: typeof FETCH, payload: number };
type FetchErrorAction = { type: typeof FETCH_ERROR, payload: any };
type FetchSuccessAction = { type: typeof FETCH_SUCCESS, payload: any };
type ResetAction = { type: typeof RESET };

export type Action =
  | FetchStatsAction
  | FetchErrorAction
  | FetchSuccessAction
  | ResetAction;

function fetch(seasonId: number): FetchStatsAction {
  return {
    type: FETCH,
    payload: seasonId
  };
}

function reset(): ResetAction {
  return {
    type: RESET
  };
}

export default {
  fetch,
  reset
};
