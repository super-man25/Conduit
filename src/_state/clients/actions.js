// import { store } from '../store';

// Constants
export const GET_REQUEST = 'clients/GET_REQUEST';
export const GET_SUCCESS = 'clients/GET_SUCCESS';
export const GET_FAILURE = 'clients/GET_FAILURE';
export const UPDATE_REQUEST = 'clients/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'clients/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'clients/UPDATE_FAILURE';

// Action creators
function getClient() {
  return {
    type: GET_REQUEST
  };
}

function updateClient(attribute, value) {
  return {
    type: UPDATE_REQUEST,
    attribute,
    value
  };
}

export default {
  getClient,
  updateClient
};
