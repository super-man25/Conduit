import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR, RESET } from './actions';

export const initialState = {
  loading: false,
  allSeasons: []
};

export default function teamStatReducer(state = initialState, action) {
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
