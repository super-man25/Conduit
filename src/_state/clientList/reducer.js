import {
  FETCH_CLIENT_LIST,
  FETCH_CLIENT_LIST_SUCCESS,
  FETCH_CLIENT_LIST_ERROR
} from './actions';

export const initialState = {
  clients: [],
  error: null,
  loading: false
};

export default function clientListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENT_LIST:
      return {
        ...state,
        loading: true
      };
    case FETCH_CLIENT_LIST_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case FETCH_CLIENT_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
