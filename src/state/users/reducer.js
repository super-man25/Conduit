import { CREATE_ASYNC, CREATE_SUCCESS, CREATE_ERROR } from './actions';

const initialState = {
  pending: false,
  model: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ASYNC:
      return { ...state, creating: true };
    case CREATE_SUCCESS:
      return { ...state, creating: false };
    case CREATE_ERROR:
      return { ...state, creating: false };
    default:
      return state;
  }
}
