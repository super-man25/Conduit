import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC,
  UPDATE_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  UPDATE_EMAIL_ASYNC,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
  CHANGE_PASSWORD_ASYNC,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS
} from './actions';

import { SUCCESS, ERROR } from '../alert/actions';

import { userService } from '../../_services';

// Workers
export function* fetchAsync() {
  try {
    yield put({ type: IS_PENDING, payload: true });
    const user = yield call(userService.getMe);
    yield put({ type: SET_USER, payload: user });
    yield put({ type: IS_PENDING, payload: false });
  } catch (err) {
    yield put({ type: IS_PENDING, payload: false });
    console.warn(err);
  }
}

export function* signInAsync(action) {
  try {
    const { email, password } = action.payload;
    const user = yield call(userService.login, email, password);
    yield put({ type: SET_USER, payload: user });
  } catch (err) {
    console.warn(err);
  }
}

export function* signOutAsync() {
  try {
    yield call(userService.logout);
    yield put({ type: SET_USER, payload: null });
  } catch (err) {
    console.warn(err);
  }
}

export function* updateAsync(action) {
  try {
    const user = action.payload;
    const updatedUser = yield call(userService.update, user);
    yield put({ type: UPDATE_SUCCESS, payload: updatedUser });
    yield put({
      type: SUCCESS,
      payload: 'Successfully Updated Personal Information'
    });
  } catch (err) {
    put({ type: UPDATE_ERROR, payload: err });
    yield put({ type: ERROR, payload: err });
  }
}

export function* updateEmailAsync(action) {
  try {
    const data = action.payload;
    const updatedUser = yield call(userService.updateEmail, data);
    yield put({ type: UPDATE_EMAIL_SUCCESS, payload: updatedUser });
    yield put({ type: SUCCESS, payload: 'Successfully Updated Email' });
  } catch (err) {
    put({ type: UPDATE_EMAIL_ERROR, payload: err });
    yield put({ type: ERROR, payload: err });
  }
}

export function* changePasswordAsync(action) {
  try {
    const data = action.payload;
    const updatedUser = yield call(userService.changePassword, data);
    yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: updatedUser });
    yield put({ type: SUCCESS, payload: 'Successfully Changed Password' });
  } catch (err) {
    put({ type: CHANGE_PASSWORD_ERROR, payload: err });
    yield put({ type: ERROR, payload: err });
  }
}

// Sagas
function* watchFetchAsync() {
  yield takeLatest(FETCH_ASYNC, fetchAsync);
}

function* watchSignInAsync() {
  yield takeEvery(SIGN_IN_ASYNC, signInAsync);
}

function* watchSignOutAsync() {
  yield takeEvery(SIGN_OUT_ASYNC, signOutAsync);
}

function* watchUpdateAsync() {
  yield takeEvery(UPDATE_ASYNC, updateAsync);
}

function* watchUpdateEmailAsync() {
  yield takeEvery(UPDATE_EMAIL_ASYNC, updateEmailAsync);
}

function* watchChangePasswordAsync() {
  yield takeEvery(CHANGE_PASSWORD_ASYNC, changePasswordAsync);
}

export default function* authSaga() {
  yield all([
    watchFetchAsync(),
    watchSignInAsync(),
    watchSignOutAsync(),
    watchUpdateAsync(),
    watchUpdateEmailAsync(),
    watchChangePasswordAsync()
  ]);
}
