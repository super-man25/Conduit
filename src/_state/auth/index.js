export { default as saga } from './saga';

const reducerName = 'auth';
const createActionType = (type) => `${reducerName}/${type}`;

// Initial State / Reducer
export const initialState = {
  model: null,
  loading: false,
  loggingIn: false,
  error: null,
  requestingPassword: false,
  forgot: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
    case UPDATE_USER:
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
    case FORGOT_PASSWORD:
      return { ...state, forgot: action.payload };
    case PASSWORD_RESET_REQUEST:
      return { ...state, requestingPassword: true, error: null };
    case PASSWORD_RESET_ERROR:
      return { ...state, error: action.payload, requestingPassword: false };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, requestingPassword: false, forgot: false };
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
const FORGOT_PASSWORD = createActionType('FORGOT_PASSWORD');
const PASSWORD_RESET_REQUEST = createActionType('PASSWORD_RESET_REQUEST');
const PASSWORD_RESET_SUCCESS = createActionType('PASSWORD_RESET_SUCCESS');
const PASSWORD_RESET_ERROR = createActionType('PASSWORD_RESET_ERROR');
const UPDATE_USER = createActionType('UPDATE_USER');

// Actions
const signIn = (email, password) => ({
  type: SIGN_IN_ASYNC,
  payload: { email, password },
});
const signOut = () => ({ type: SIGN_OUT_ASYNC });
const forgotPass = (email) => ({ type: FORGOT_PASS_ASYNC, payload: { email } });
const showForgotPass = (val) => ({ type: types.FORGOT_PASSWORD, payload: val });
const fetch = () => ({ type: FETCH_ASYNC });
const setUser = (user) => ({ type: types.SET_USER, payload: user });
const unsetUser = () => ({ type: types.UNSET_USER });
const updateUser = (user) => ({ type: types.UPDATE_USER, payload: user });

// Exports
export const types = {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  UNSET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC,
  FORGOT_PASS_ASYNC,
  FORGOT_PASSWORD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  UPDATE_USER,
};
export const actions = {
  signIn,
  signOut,
  forgotPass,
  showForgotPass,
  fetch,
  setUser,
  unsetUser,
  updateUser,
};
export const selectors = {
  selectUser,
  selectLoading,
  selectLoggingIn,
};
