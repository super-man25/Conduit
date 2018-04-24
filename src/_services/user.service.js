import { baseURL } from '../_constants';

const API = {
  meURL: `${baseURL}/me`,
  loginURL: `${baseURL }/auth`, // - method POST
  logoutURL: `${baseURL }/auth`, // - method DELETE
  getAllURL: `${baseURL }/users`, // - method GET (for isAdmin users only)
  getByIdURL: `${baseURL }/users/`, // users/{id} - method GET
  registerURL: `${baseURL }/users`, // - method POST (for isAdmin users only)
  updateURL: `${baseURL }/users/`, // users/{id} - method PUT (for isAdmin users only)
  deleteURL: `${baseURL }/users` // users/{id} - method DELETE (for isAdmin users only)
};

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function login(email, password) {
  const requestOptions = {
    credentials: 'include', // this is required to have cookies sent back and forth in the headers
    mode: 'cors',
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(API.loginURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    });
}

function logout() {
  const requestOptions = {
    credentials: 'include',
    method: 'DELETE'
  };
  return fetch(API.logoutURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.statusText;
    });
}

function getMe() {
  return fetch(API.meURL, {
    credentials: 'include',
    mode: 'cors',
    method: 'GET'
  }).then(handleResponse);
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

function update(user) {
  const requestOptions = {
    credentials: 'include',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(API.updateURL + user.id, requestOptions).then(handleResponse);
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
  delete: _delete
};
