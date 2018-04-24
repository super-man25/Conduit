import { authHeader } from '../_helpers';
import { baseURL } from '../_constants';

const API = {
  getURL: `${baseURL}/clients`, // - method GET
  updateURL: `${baseURL}/clients` // - method PUT
};

const user = JSON.parse(localStorage.getItem('user'));
let tempId = 2;

if (API.getURL.indexOf('fake') === -1 && typeof user !== undefined && user) {
  tempId = user.id;
  // console.log('~~~~~ clientService NOT in test mode, userId based on user in localstorage ~~~~~');
}

const clientId = tempId;

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
    method: 'GET',
    headers: authHeader()
  };
  const requestURL = `${API.getURL}/${clientId}`;

  return fetch(requestURL, requestOptions).then(handleResponse);
}

function updateClient(updateObj) {
  // console.log('~~~~~ clientService.getClient()  - updateObj is: ~~~~~', updateObj);
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(updateObj)
  };

  return fetch(`${API.updateURL}/${clientId}`, requestOptions).then(handleResponse);
}

export const clientService = {
  getClient,
  updateClient
};
