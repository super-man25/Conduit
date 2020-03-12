// @flow
import { createSelector } from 'reselect';
import type { EDSeason } from '_models';

export { default as saga } from './saga';

// Action Types
const INIT = 'season/INIT';
const FETCH = 'season/FETCH';
const FETCH_SUCCESS = 'season/FETCH_SUCCESS';
const FETCH_ERROR = 'season/FETCH_ERROR';
const SET_ACTIVE = 'season/SET_ACTIVE';
const RESET = 'season/RESET';

export type InitAction = { type: 'season/INIT' };
export type FetchAction = { type: 'season/FETCH' };
export type FetchSuccessAction = {
  type: 'season/FETCH_SUCCESS',
  payload: EDSeason[],
};
export type FetchErrorAction = { type: 'season/FETCH_ERROR', payload: Error };
export type SetActiveAction = { type: 'season/SET_ACTIVE', payload: number };
export type ResetAction = { type: 'season/RESET' };

export type Action =
  | InitAction
  | FetchAction
  | FetchSuccessAction
  | FetchErrorAction
  | SetActiveAction
  | ResetAction;

export const types = {
  FETCH,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_ACTIVE,
  RESET,
  INIT,
};

// Actions
const fetchSeasons = (): FetchAction => ({ type: FETCH });
const resetSeasons = (): ResetAction => ({ type: RESET });
const setActiveId = (id: number): SetActiveAction => ({
  type: SET_ACTIVE,
  payload: id,
});

export const actions = {
  fetchSeasons,
  resetSeasons,
  setActiveId,
};

// Reducer/Initial State
export type State = {
  seasons: EDSeason[],
  activeId: ?number,
  loading: boolean,
  error: ?Error,
};

export const initialState = {
  seasons: [],
  activeId: null,
  loading: false,
  error: null,
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, seasons: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_ACTIVE:
      return { ...state, activeId: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Selectors
type Store = {
  season: State,
};

const selectSeasons = (store: Store) => store.season.seasons;
const selectLoading = (store: Store) => store.season.loading;
const selectError = (store: Store) => store.season.error;
const selectActiveSeasonId = (store: Store) => store.season.activeId;
const selectActiveSeason = createSelector(
  [selectSeasons, selectActiveSeasonId],
  (seasons, id) => seasons.find((season) => season.id === id)
);

export const selectors = {
  selectSeasons,
  selectLoading,
  selectError,
  selectActiveSeasonId,
  selectActiveSeason,
};
