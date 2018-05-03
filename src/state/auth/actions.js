// Constants
export const FETCH_ASYNC = 'auth/FETCH_ASYNC';
export const IS_PENDING = 'auth/IS_PENDING';
export const SET_USER = 'auth/SET_USER';
export const SIGN_IN_ASYNC = 'auth/SIGN_IN_ASYNC';
export const SIGN_OUT_ASYNC = 'auth/SIGN_OUT_ASYNC';

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

export default {
  fetch,
  signIn,
  signOut
};
