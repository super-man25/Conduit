// Constants
export const FETCH_ASYNC = 'auth/FETCH_ASYNC';
export const IS_PENDING = 'auth/IS_PENDING';
export const SET_USER = 'auth/SET_USER';
export const SIGN_IN_ASYNC = 'auth/SIGN_IN_ASYNC';
export const SIGN_OUT_ASYNC = 'auth/SIGN_OUT_ASYNC';
export const UPDATE_ASYNC = 'users/UPDATE_ASYNC';
export const UPDATE_SUCCESS = 'users/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'users/UPDATE_ERROR';
export const UPDATE_EMAIL_ASYNC = 'users/UPDATE_EMAIL_ASYNC';
export const UPDATE_EMAIL_SUCCESS = 'users/UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_ERROR = 'users/UPDATE_EMAIL_ERROR';
export const CHANGE_PASSWORD_ASYNC = 'users/CHANGE_PASSWORD_ASYNC';
export const CHANGE_PASSWORD_SUCCESS = 'users/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'users/CHANGE_PASSWORD_ERROR';

// Action creators
function signIn(email, password) {
  return {
    type: SIGN_IN_ASYNC,
    payload: {
      email,
      password
    }
  };
}

function signOut() {
  return {
    type: SIGN_OUT_ASYNC
  };
}

function fetch() {
  return {
    type: FETCH_ASYNC
  };
}

function update(user) {
  return {
    type: UPDATE_ASYNC,
    payload: user
  };
}

function updateEmail(data) {
  return {
    type: UPDATE_EMAIL_ASYNC,
    payload: data
  };
}

function changePassword(data) {
  return {
    type: CHANGE_PASSWORD_ASYNC,
    payload: data
  };
}

export default {
  fetch,
  signIn,
  signOut,
  update,
  updateEmail,
  changePassword
};
