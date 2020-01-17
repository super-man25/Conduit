import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS, RESET } from './actions';

export const initialState = {
  loading: false,
  record: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case FETCH_ASYNC:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        record: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
