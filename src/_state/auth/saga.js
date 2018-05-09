import { userService } from '_services';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC
} from './actions';

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

export default {
  watchFetchAsync,
  watchSignInAsync,
  watchSignOutAsync
};
