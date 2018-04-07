import { authHeader } from '../_helpers';

const fakeAPI = {
  loginURL: '/users/authenticate',
  logoutURL: '/users/logout',
  getAllURL: '/users',
  getByIdURL: '/users/',
  registerURL: '/users/register',
  updateURL: '/users/',
  deleteURL: '/users/'
}

const API = {
  loginURL: 'http://localhost:9000/auth/signIn',
  logoutURL: 'http://localhost:9000/auth/logout',
  getAllURL: '/users',
  getByIdURL: '/users/',
  registerURL: 'http://localhost:9000/auth/createUser',
  updateURL: '/users/',
  deleteURL: 'http://localhost:9000/auth/delete'
}

const realAPI = true;

const loginURL = realAPI ? API.loginURL : fakeAPI.loginURL;
const logoutURL = realAPI ? API.logoutURL : fakeAPI.logoutURL;
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

  console.log('~~~~~~~~~~ login function in user service ~~~~~~~~~~');
  const requestOptions = {
    credentials: 'include',        // this is required to have cookies sent back and forth in the headers
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  console.log('~~~~~~~~~~ requestOptions: ', requestOptions);

  return fetch(loginURL, requestOptions)
    .then(response => {
      console.log('~~~~~ response: ~~~~~', response);
      if (!response.ok) { 
        console.log('~~~~~~~~~~ gonna reject it');
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      console.log('~~~~~ user: ~~~~~', user);
      // login successful if the response is a user object with an id
      if (realAPI && user && user.id) {        
        console.log('~~~~~ successfully logged in this user using the real API and cookie authentication: ~~~~~', user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      } else if (!realAPI && user && user.token) {
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
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(logoutURL, requestOptions)
  .then(response => {
    if (!response.ok) { 
      return Promise.reject(response.statusText);
    }
    console.log('~~~~~ successfully logged out this user! ~~~~~');
    return response.json();
  });
}

function getAll() {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
    headers: authHeader()
  };

  return fetch(getAllURL, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    credentials: 'include',
    method: 'GET',
    headers: authHeader()
  };

  return fetch(getByIdURL + id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(registerURL, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    credentials: 'include',
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(updateURL + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    credentials: 'include',
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