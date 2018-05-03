// Constants
export const CREATE_ASYNC = 'users/CREATE_ASYNC';
export const CREATE_SUCCESS = 'users/CREATE_SUCCESS';
export const CREATE_ERROR = 'users/CREATE_ERROR';
export const UPDATE_ASYNC = 'users/UPDATE_ASYNC';
export const UPDATE_SUCCESS = 'users/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'users/UPDATE_ERROR';
export const UPDATE_EMAIL_ASYNC = 'users/UPDATE_EMAIL_ASYNC';
export const UPDATE_EMAIL_SUCCESS = 'users/UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_ERROR = 'users/UPDATE_EMAIL_ERROR';
export const CHANGE_PASSWORD_ASYNC = 'users/CHANGE_PASSWORD_ASYNC';
export const CHANGE_PASSWORD_SUCCESS = 'users/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'users/CHANGE_PASSWORD_ERROR';

// Action Creators
function create(user) {
  return {
    type: CREATE_ASYNC,
    payload: user
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
  create,
  update,
  updateEmail,
  changePassword
};
