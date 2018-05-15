import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR, RESET } from './actions';

export const initialState = {
  loading: false,
  overview: null
};

export default function teamStatReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, overview: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
