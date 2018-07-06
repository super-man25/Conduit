import { userService } from '_services';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { types } from '.';
import { actions as alertActions } from '_state/alert';

// Workers
export function* fetchAsync() {
  try {
    yield put({ type: types.IS_PENDING, payload: true });
    const user = yield call(userService.getMe);
    yield put({ type: types.SET_USER, payload: user });
    yield put({ type: types.IS_PENDING, payload: false });
  } catch (err) {
    yield put({ type: types.IS_PENDING, payload: false });
    console.warn(err);
  }
}

export function* signInAsync(action) {
  try {
    const { email, password } = action.payload;
    const user = yield call(userService.login, email, password);
    yield put({ type: types.SET_USER, payload: user });
  } catch (err) {
    console.warn(err);
    yield put(alertActions.error(err.message));
  }
}

export function* signOutAsync() {
  try {
    yield call(userService.logout);
    yield put({ type: types.UNSET_USER });
  } catch (err) {
    console.warn(err);
  }
}

export function* forgotPassAsync(action) {
  const { email } = action.payload;
  try {
    yield call(userService.forgotPass, { email: email });
  } catch (err) {
    console.warn(err);
  }
}

// Sagas
function* watchFetchAsync() {
  yield takeLatest(types.FETCH_ASYNC, fetchAsync);
}

function* watchSignInAsync() {
  yield takeEvery(types.SIGN_IN_ASYNC, signInAsync);
}

function* watchSignOutAsync() {
  yield takeEvery(types.SIGN_OUT_ASYNC, signOutAsync);
}

function* watchForgotPassAsync() {
  yield takeEvery(types.FORGOT_PASS_ASYNC, forgotPassAsync);
}

export default {
  watchFetchAsync,
  watchSignInAsync,
  watchSignOutAsync,
  watchForgotPassAsync
};
