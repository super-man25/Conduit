export { default as saga } from './saga';

const reducerName = 'auth';
const createActionType = (type) => `${reducerName}/${type}`;

// Initial State / Reducer
export const initialState = {
  model: null,
  loading: true
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, model: action.payload };
    case UNSET_USER:
      return { ...state, model: null };
    case IS_PENDING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Selectors
const selectUser = (store) => store[reducerName].model;
const selectLoading = (store) => store[reducerName].loading;

// Action Types
const FETCH_ASYNC = createActionType('FETCH_ASYNC');
const IS_PENDING = createActionType('IS_PENDING');
const SET_USER = createActionType('SET_USER');
const UNSET_USER = createActionType('UNSET_USER');
const SIGN_IN_ASYNC = createActionType('SIGN_IN_ASYNC');
const SIGN_OUT_ASYNC = createActionType('SIGN_OUT_ASYNC');
const FORGOT_PASS_ASYNC = createActionType('FORGOT_PASS_ASYNC');

// Actions
const signIn = (email, password) => ({
  type: SIGN_IN_ASYNC,
  payload: { email, password }
});
const signOut = () => ({ type: SIGN_OUT_ASYNC });
const forgotPass = (email) => ({ type: FORGOT_PASS_ASYNC, payload: { email } });
const fetch = () => ({ type: FETCH_ASYNC });

// Exports
export const types = {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  UNSET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC,
  FORGOT_PASS_ASYNC
};
export const actions = {
  signIn,
  signOut,
  forgotPass,
  fetch
};
export const selectors = {
  selectUser,
  selectLoading
};
