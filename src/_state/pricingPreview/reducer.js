import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR, RESET } from './actions';

export const initialState = {
  loading: false,
  record: undefined,
  error: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case FETCH_ASYNC:
      return {
        ...initialState,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        record: action.payload
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: undefined
      };
    default:
      return state;
  }
}
