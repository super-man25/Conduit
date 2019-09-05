import {
  CREATE_ASYNC,
  CREATE_SUCCESS,
  CREATE_ERROR,
  UPDATE_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  UPDATE_EMAIL_ASYNC,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
  CHANGE_PASSWORD_ASYNC,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR
} from './actions';

const initialState = {
  loading: false,
  saved: false,
  model: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASYNC:
      return { ...state, loading: true, saved: false };
    case CREATE_SUCCESS:
      return { ...state, loading: false, saved: true };
    case CREATE_ERROR:
      return { ...state, loading: false, saved: false };
    case UPDATE_ASYNC:
      return { ...state, loading: true };
    case UPDATE_SUCCESS:
      return { loading: false, model: action.payload };
    case UPDATE_ERROR:
      return { ...state, loading: false };
    case UPDATE_EMAIL_ASYNC:
      return { ...state, loading: true };
    case UPDATE_EMAIL_SUCCESS:
      return { loading: false, model: action.payload };
    case UPDATE_EMAIL_ERROR:
      return { ...state, loading: false };
    case CHANGE_PASSWORD_ASYNC:
      return { ...state, loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, model: action.payload };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}
