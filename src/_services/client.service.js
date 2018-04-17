import { authHeader } from '../_helpers';
import { baseURL, FAKE_API } from '../_constants';

console.log(`~~~~~ baseURL is ${ baseURL } ~~~~~`);
console.log(`~~~~~ FAKE_API is ${ FAKE_API } ~~~~~`);

const API = {
  getSettingsURL: `${baseURL }/client/settings`, // - method GET
  updateSettingsURL: `${baseURL }/client/settings` // method PUT
};

// function login(email, password) {
//   const requestOptions = {
//     credentials: 'include', // this is required to have cookies sent back and forth in the headers
//     mode: 'cors',
//     method: 'POST',
//     // headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   };

//   return fetch(API.loginURL, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         console.log('~~~~~ response: ~~~~~', response);
//         return Promise.reject(response.statusText);
//       }
//       return response.json();
//     })
//     .then((user) => {
//       // login successful if the response is a user object with an id
//       if (!FAKE_API && user && user.id) {
//         console.log('~~~~~ successfully logged in this user using the real API and cookie authentication: ~~~~~', user);
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('user', JSON.stringify(user));
//       } else if (FAKE_API && user && user.token) {
//         // login successful if there's a jwt token in the response
//         console.log('~~~~~ successfully logged in this user using the fake backend and JWT authentication: ~~~~~', user);
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('user', JSON.stringify(user));
//       }
//       return user;
//     });
// }

// function logout() {
//   console.log('~~~~~~~~~~ logout function in user service ~~~~~~~~~~');
//   // remove user from local storage to close private routes on client
//   localStorage.removeItem('user');
//   const requestOptions = {
//     credentials: 'include',
//     method: 'DELETE'
//   };
//   return fetch(API.logoutURL, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         return Promise.reject(response.statusText);
//       }
//       console.log('~~~~~ successfully logged out this user! ~~~~~');
//       return response.statusText;
//     });
// }

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function getSettings() {
  const requestOptions = {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
    headers: authHeader()
  };

  return fetch(API.getSettingsURL, requestOptions).then(handleResponse);
}

function updateSettings(updateObj) {
  const requestOptions = {
    credentials: 'include',
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updateObj)
  };

  return fetch(API.updateSettingsURL, requestOptions).then(handleResponse);
}

export const clientService = {
  getSettings,
  updateSettings
};
