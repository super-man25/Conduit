import { userService } from '_services';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { types, actions } from '.';
import { actions as alertActions } from '../alert';
import { push } from 'connected-react-router';
import { actions as clientActions } from '_state/client';

// Workers
export function* fetchAsync() {
  try {
    yield put({ type: types.IS_PENDING, payload: true });
    const user = yield call(userService.getMe);
    yield call(userService.setAuthInStorage, user);
    yield put(actions.setUser(user));
    yield put(clientActions.fetch());
    yield put({ type: types.IS_PENDING, payload: false });
  } catch (err) {
    yield put({ type: types.IS_PENDING, payload: false });
    yield call(userService.setAuthInStorage, null);
    console.warn(err);
  }
}

export function* signInAsync(action) {
  try {
    const { email, password } = action.payload;
    yield put({ type: types.LOGIN_REQUEST });
    const user = yield call(userService.login, email, password);
    yield call(userService.setAuthInStorage, user);
    yield put({ type: types.LOGIN_SUCCESS, payload: user });
    yield put(clientActions.fetch());
    // Redirect to home page
    yield put(push('/'));
  } catch (err) {
    console.warn(err);
    yield put({ type: types.LOGIN_ERROR, payload: err });
  }
}

export function* signOutAsync() {
  try {
    yield call(userService.logout);
    yield call(userService.setAuthInStorage, null);
    yield put(actions.unsetUser());
    yield put({ type: 'global/RESET' });
  } catch (err) {
    console.warn(err);
  }
}

export function* forgotPassAsync(action) {
  try {
    const { email } = action.payload;
    yield put({ type: types.PASSWORD_RESET_REQUEST });
    yield call(userService.forgotPass, { email: email });
    yield put({ type: types.PASSWORD_RESET_SUCCESS });
    yield put(alertActions.success('Password recovery email sent'));
  } catch (err) {
    console.warn(err);
    yield put({ type: types.PASSWORD_RESET_ERROR, payload: err });
    yield put(alertActions.error('Password recovery email could not be sent'));
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
  watchForgotPassAsync,
};
