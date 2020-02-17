// @flow
import type { EDVenue, EDVenueSVGMapping } from '_models';

export const types = {
  FETCH_SEAT_MAP_REQUEST: 'seatmap/FETCH_SEAT_MAP_REQUEST',
  FETCH_SEAT_MAP_SUCCESS: 'seatmap/FETCH_SEAT_MAP_SUCCESS',
  FETCH_SEAT_MAP_ERROR: 'seatmap/FETCH_SEAT_MAP_ERROR',
  RESET: 'seatmap/RESET',
};

export type FetchSeatMapRequest = {
  type: 'seatmap/FETCH_SEAT_MAP_REQUEST',
};
export type FetchSeatMapSuccess = {
  type: 'seatmap/FETCH_SEAT_MAP_SUCCESS',
  payload: {
    venue: EDVenue,
    objUrl: string,
  },
};
export type FetchSeatMapError = {
  type: 'seatmap/FETCH_SEAT_MAP_ERROR',
  payload: Error,
};
export type ResetSeatMap = {
  type: 'seatmap/RESET',
};

export type Action =
  | FetchSeatMapRequest
  | FetchSeatMapSuccess
  | FetchSeatMapError
  | ResetSeatMap;

export const actions = {
  fetchSeatMap: (): FetchSeatMapRequest => ({
    type: types.FETCH_SEAT_MAP_REQUEST,
  }),

  fetchSeatMapSuccess: (payload: {
    venue: EDVenue,
    objUrl: string,
  }): FetchSeatMapSuccess => ({
    type: types.FETCH_SEAT_MAP_SUCCESS,
    payload,
  }),

  fetchSeatMapError: (error: Error): FetchSeatMapError => ({
    type: types.FETCH_SEAT_MAP_ERROR,
    payload: error,
  }),

  resetSeatMap: (): ResetSeatMap => ({
    type: types.RESET,
  }),
};

export type State = {
  +loading: boolean,
  +error: ?Error,
  +mapping: EDVenueSVGMapping[],
  +venue: ?EDVenue,
  objUrl: ?string,
};

export const initialState = {
  loading: false,
  error: null,
  mapping: [],
  objUrl: null,
  venue: null,
};

export const reducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case types.FETCH_SEAT_MAP_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_SEAT_MAP_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case types.FETCH_SEAT_MAP_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.RESET:
      return initialState;
    default:
      return state;
  }
};

type Store = {
  seatMap: State,
};

export const selectors = {
  selectLoading: (store: Store) => store.seatMap.loading,
  selectError: (store: Store) => store.seatMap.error,
  selectMapping: (store: Store) => store.seatMap.mapping,
  selectVenue: (store: Store) => store.seatMap.venue,
  selectVenueMapBlob: (store: Store) => store.seatMap.objUrl,
};

export { default as saga } from './saga';
