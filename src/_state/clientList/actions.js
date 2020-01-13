export const FETCH_CLIENT_LIST = 'clientList/FETCH_CLIENT_LIST';
export const FETCH_CLIENT_LIST_SUCCESS = 'clientList/FETCH_CLIENT_LIST_SUCCESS';
export const FETCH_CLIENT_LIST_ERROR = 'clientList/FETCH_CLIENT_LIST_ERROR';

const fetchClientList = () => ({
  type: FETCH_CLIENT_LIST,
});

const fetchClientListSuccess = (clientList) => ({
  type: FETCH_CLIENT_LIST_SUCCESS,
  payload: clientList,
});

const fetchClientListError = (err) => ({
  type: FETCH_CLIENT_LIST_ERROR,
  payload: err,
});

export default {
  fetchClientList,
  fetchClientListSuccess,
  fetchClientListError,
};
