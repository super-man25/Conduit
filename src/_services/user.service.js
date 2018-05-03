import { baseURL } from '../_constants';
import { normalize } from './user.normalize';
import { get, put, post } from '../_helpers/api';

const API = {
  meURL: `${baseURL}/me`,
  logoutURL: `${baseURL}/auth`, // - method DELETE
  getAllURL: `${baseURL}/users`, // - method GET (for isAdmin users only)
  getByIdURL: `${baseURL}/users/`, // users/{id} - method GET
  registerURL: `${baseURL}/users`, // - method POST (for isAdmin users only)
  deleteURL: `${baseURL}/users` // users/{id} - method DELETE (for isAdmin users only)
};

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function login(email, password) {
  return post('auth', { email, password }).then((user) => normalize(user));
}

function logout() {
  const requestOptions = {
    credentials: 'include',
    method: 'DELETE'
  };
  return fetch(API.logoutURL, requestOptions).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.statusText;
  });
}

function getMe() {
  return get('me').then((user) => normalize(user));
}

function getAll() {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET'
  };

  return fetch(API.getAllURL, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    credentials: 'include',
    method: 'GET'
  };

  return fetch(API.getByIdURL + id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(API.registerURL, requestOptions).then(handleResponse);
}

function update(data) {
  return put('users', data).then((user) => normalize(user));
}

function updateEmail(data) {
  return put('users/email', data).then((user) => normalize(user));
}

function changePassword(data) {
  return put('users/password', data).then((user) => normalize(user));
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    credentials: 'include',
    method: 'DELETE'
  };

  return fetch(API.deleteURL + id, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getMe,
  changePassword,
  updateEmail,
  delete: _delete
};
