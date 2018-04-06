import { authHeader } from '../_helpers';
import cookie from 'react-cookies'

const fakeAPI = {
  loginURL: '/users/authenticate',
  getAllURL: '/users',
  getByIdURL: '/users/',
  registerURL: '/users/register',
  updateURL: '/users/',
  deleteURL: '/users/'
}

const API = {
  loginURL: 'http://localhost:9000/auth/signIn',
  getAllURL: '/users',
  getByIdURL: '/users/',
  registerURL: 'http://localhost:9000/auth/createUser',
  updateURL: '/users/',
  deleteURL: 'http://localhost:9000/auth/delete'
}

const realAPI = true;

const loginURL = realAPI ? API.loginURL : fakeAPI.loginURL;
const getAllURL = realAPI ? API.getAllURL : fakeAPI.getAllURL;
const getByIdURL = realAPI ? API.getByIdURL : fakeAPI.getByIdURL;
const registerURL = realAPI ? API.registerURL : fakeAPI.registerURL;
const updateURL = realAPI ? API.updateURL : fakeAPI.updateURL;
const deleteURL = realAPI ? API.deleteURL : fakeAPI.deleteURL;

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
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referrer-Policy': 'origin-when-cross-origin, strict-origin-when-cross-origin', 'X-Permitted-Cross-Domain-Policies': 'master-only' },
    body: JSON.stringify({ email, password })
  };

  return fetch(loginURL, requestOptions)
    .then(response => {
      if (!response.ok) { 
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      // // login successful if there's a jwt token in the response
      // if (user && user.token) {
      //   // store user details and jwt token in local storage to keep user logged in between page refreshes
      //   localStorage.setItem('user', JSON.stringify(user));

      // login successful if there's a jwt token in the response
      if (user && user['x-axis-token']) {
        // store user details and jwt token in a cookie to keep user logged in between page refreshes
        
        console.log(user);
        console.log('~~~~~ x-access-token: ', user['x-axis-token']);
        cookie.save('x-access-token', user['x-access-token']);

      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(getAllURL, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(getByIdURL + id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(registerURL, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(updateURL + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(deleteURL + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}