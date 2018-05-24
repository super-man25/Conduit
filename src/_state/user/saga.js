import { userService } from '_services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ERROR, SUCCESS } from '../alert/actions';
import {
  CHANGE_PASSWORD_ASYNC,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_ASYNC,
  CREATE_ERROR,
  CREATE_SUCCESS,
  UPDATE_ASYNC,
  UPDATE_EMAIL_ASYNC,
  UPDATE_EMAIL_ERROR,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_ERROR,
  UPDATE_SUCCESS
} from './actions';
import { FETCH_ASYNC } from '../auth/actions';

// Workers
export function* createAsync(action) {
  try {
    yield call(userService.register, action.payload);
    yield put({ type: CREATE_SUCCESS });
  } catch (err) {
    yield put({ type: CREATE_ERROR, payload: err });
  }
}

export function* updateAsync(action) {
  try {
    const user = action.payload;
    const updatedUser = yield call(userService.update, user);
    yield put({ type: UPDATE_SUCCESS, payload: updatedUser });
    yield put({ type: FETCH_ASYNC });
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
    yield put({ type: FETCH_ASYNC });
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
    yield put({ type: FETCH_ASYNC });
    yield put({ type: SUCCESS, payload: 'Successfully Changed Password' });
  } catch (err) {
    put({ type: CHANGE_PASSWORD_ERROR, payload: err });
    yield put({ type: ERROR, payload: err });
  }
}

// Sagas
function* watchCreateAsync() {
  yield takeEvery(CREATE_ASYNC, createAsync);
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

export default {
  watchCreateAsync,
  watchUpdateAsync,
  watchUpdateEmailAsync,
  watchChangePasswordAsync
};
