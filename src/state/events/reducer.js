import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR, RESET } from './actions';

const initialState = {
  loading: false,
  model: null
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { loading: false, model: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
