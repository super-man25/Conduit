// Constants
export const CREATE_ASYNC = 'users/CREATE_ASYNC';
export const CREATE_SUCCESS = 'users/CREATE_SUCCESS';
export const CREATE_ERROR = 'users/CREATE_ERROR';

// Action Creators
function create(user) {
  return {
    type: CREATE_ASYNC,
    payload: user
  };
}

export default {
  create
};
