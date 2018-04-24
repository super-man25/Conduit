import {
  IS_PENDING,
  SET_USER
} from './actions';

const initialState = {
  model: null,
  pending: true
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case (SET_USER):
      return { ...state, model: action.payload };
    case (IS_PENDING):
      return { ...state, pending: action.payload };
    default:
      return state;
  }
}
