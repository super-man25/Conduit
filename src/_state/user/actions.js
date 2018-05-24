// Constants
export const CREATE_ASYNC = 'user/CREATE_ASYNC';
export const CREATE_SUCCESS = 'user/CREATE_SUCCESS';
export const CREATE_ERROR = 'user/CREATE_ERROR';
export const UPDATE_ASYNC = 'user/UPDATE_ASYNC';
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'user/UPDATE_ERROR';
export const UPDATE_EMAIL_ASYNC = 'user/UPDATE_EMAIL_ASYNC';
export const UPDATE_EMAIL_SUCCESS = 'user/UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_ERROR = 'user/UPDATE_EMAIL_ERROR';
export const CHANGE_PASSWORD_ASYNC = 'user/CHANGE_PASSWORD_ASYNC';
export const CHANGE_PASSWORD_SUCCESS = 'user/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'user/CHANGE_PASSWORD_ERROR';

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
