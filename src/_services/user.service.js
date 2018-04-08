import { authHeader } from '../_helpers';
import { baseURL, FAKE_API } from '../_constants';

console.log('~~~~~ baseURL is ' + baseURL + ' ~~~~~');
console.log('~~~~~ FAKE_API is ' + FAKE_API + ' ~~~~~');

const API = {
  loginURL: baseURL + '/auth/signIn',                             // still in auth/
  logoutURL: baseURL + '/auth/logout',                            // still in auth/
  getAllURL: baseURL + '/users',                                  // users/
  getByIdURL: baseURL + '/users/',                                // users/
  registerURL: baseURL + '/users/create',                         // users/create
  updateURL: baseURL + '/users/',                                 // not yet, but users/?
  deleteURL: baseURL + '/users/delete'                            // users/delete
}

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(email, password) {
  const requestOptions = {
    credentials: 'include',        // this is required to have cookies sent back and forth in the headers
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(API.loginURL, requestOptions)
    .then(response => {
      if (!response.ok) { 
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(user => {
      // login successful if the response is a user object with an id
      if (!FAKE_API && user && user.id) {        
        console.log('~~~~~ successfully logged in this user using the real API and cookie authentication: ~~~~~', user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      } else if (FAKE_API && user && user.token) {
        // login successful if there's a jwt token in the response
        console.log('~~~~~ successfully logged in this user using the fake backend and JWT authentication: ~~~~~', user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  console.log('~~~~~~~~~~ logout function in user service ~~~~~~~~~~');
  // remove user from local storage to close private routes on client
  localStorage.removeItem('user');
  const requestOptions = {
    credentials: 'include',
    method: 'GET'
  };
  return fetch(API.logoutURL, requestOptions)
  .then(response => {
    if (!response.ok) { 
      return Promise.reject(response.statusText);
    }
    console.log('~~~~~ successfully logged out this user! ~~~~~');
    return response.statusText;
  });
}

function getAll() {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
    headers: authHeader()
  };

  return fetch(API.getAllURL, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: authHeader()
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
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(API.updateURL + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    credentials: 'include',
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(API.deleteURL + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}