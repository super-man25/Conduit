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

function forgotPass(data) {
  return post('users/forgot', data);
}

function deleteUser(id) {
  return del(`users/${id}`);
}

function setAuthInStorage(user) {
  localStorage.setItem('auth', JSON.stringify(user));
}

function getAuthFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch (err) {
    return null;
  }
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
  forgotPass,
  updateEmail,
  delete: deleteUser,
  setAuthInStorage,
  getAuthFromStorage,
};
