import { userService } from '_services';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USERS_ASYNC,
  FETCH_USERS_ASYNC_SUCCESS,
  FETCH_USERS_ASYNC_ERROR
} from './index';
import { actions as alertActions } from '../alert';

// Workers
export function* fetchUsersAsync() {
  try {
    const users = yield call(userService.getAll);
    yield put({ type: FETCH_USERS_ASYNC_SUCCESS, payload: users });
  } catch (err) {
    put({ type: FETCH_USERS_ASYNC_ERROR, payload: err });
    yield put(alertActions.error('Error occurred while fetching all users'));
  }
}

// Sagas
function* watchFetchUsersAsync() {
  yield takeLatest(FETCH_USERS_ASYNC, fetchUsersAsync);
}

export default {
  watchFetchUsersAsync
};
