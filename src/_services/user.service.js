import { get, put, post, del } from '_helpers/api';

function login(email, password) {
  return post('auth', { email, password });
}

function logout() {
  return del('auth');
}

function getMe() {
  return get('me');
}

function getAll() {
  return get('users');
}

function getById(id) {
  return get(`users/${id}`);
}

function register(user) {
  return post('users', user);
}

function update(data) {
  return put('users', data);
}

function updateEmail(data) {
  return put('users/email', data);
}

function changePassword(data) {
  return put('users/password', data);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return del(`users/${id}`);
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
