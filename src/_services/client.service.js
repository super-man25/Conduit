import { baseURL } from '_constants';
import { store } from '_state/store';

const API = {
  getURL: `${baseURL}/clients`, // - method GET
  updateURL: `${baseURL}/clients` // - method PUT
};

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const apiResponse = response.json();
  return apiResponse;
}

function getClient() {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET'
  };
  const requestURL = `${API.getURL}/${store.getState().auth.model.clientId}`;

  return fetch(requestURL, requestOptions).then(handleResponse);
}

function updateClient(updateObj) {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify(updateObj)
  };
  const requestURL = `${API.getURL}/${updateObj.id}`;

  return fetch(requestURL, requestOptions).then(handleResponse);
}

export const clientService = {
  getClient,
  updateClient
};
