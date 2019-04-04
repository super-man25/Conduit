export { default as saga } from './saga';

const reducerName = 'auth';
const createActionType = (type) => `${reducerName}/${type}`;

// Initial State / Reducer
export const initialState = {
  model: null,
  loading: false,
  loggingIn: false,
  error: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, model: action.payload, error: null };
    case UNSET_USER:
      return { ...state, model: null };
    case IS_PENDING:
      return { ...state, loading: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loggingIn: true, error: null };
    case LOGIN_ERROR:
      return { ...state, error: action.payload, loggingIn: false };
    case LOGIN_SUCCESS:
      return { ...state, model: action.payload, loggingIn: false };
    default:
      return state;
  }
};

// Selectors
const selectUser = (store) => store[reducerName].model;
const selectLoading = (store) => store[reducerName].loading;
const selectLoggingIn = (store) => store[reducerName].loggingIn;

// Action Types
const FETCH_ASYNC = createActionType('FETCH_ASYNC');
const IS_PENDING = createActionType('IS_PENDING');
const SET_USER = createActionType('SET_USER');
const UNSET_USER = createActionType('UNSET_USER');
const SIGN_IN_ASYNC = createActionType('SIGN_IN_ASYNC');
const SIGN_OUT_ASYNC = createActionType('SIGN_OUT_ASYNC');
const FORGOT_PASS_ASYNC = createActionType('FORGOT_PASS_ASYNC');
const LOGIN_REQUEST = createActionType('LOGIN_REQUEST');
const LOGIN_SUCCESS = createActionType('LOGIN_SUCCESS');
const LOGIN_ERROR = createActionType('LOGIN_ERROR');

// Actions
const signIn = (email, password) => ({
  type: SIGN_IN_ASYNC,
  payload: { email, password }
});
const signOut = () => ({ type: SIGN_OUT_ASYNC });
const forgotPass = (email) => ({ type: FORGOT_PASS_ASYNC, payload: { email } });
const fetch = () => ({ type: FETCH_ASYNC });
const setUser = (user) => ({ type: types.SET_USER, payload: user });
const unsetUser = () => ({ type: types.UNSET_USER });

// Exports
export const types = {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  UNSET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC,
  FORGOT_PASS_ASYNC,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
};
export const actions = {
  signIn,
  signOut,
  forgotPass,
  fetch,
  setUser,
  unsetUser
};
export const selectors = {
  selectUser,
  selectLoading,
  selectLoggingIn
};
