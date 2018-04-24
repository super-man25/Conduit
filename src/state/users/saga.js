import { all, takeEvery, call, put } from 'redux-saga/effects';
import { userService } from '../../_services';
import {
  CREATE_ASYNC,
  CREATE_SUCCESS,
  CREATE_ERROR
} from './actions';

// Workers
export function* createAsync(action) {
  try {
    yield call(userService.register, action.payload);
    yield put({ type: CREATE_SUCCESS });
  } catch (err) {
    yield put({ type: CREATE_ERROR, payload: err });
  }
}

// Sagas
function* watchCreateAsync() {
  yield takeEvery(CREATE_ASYNC, createAsync);
}

export default function* usersSaga() {
  yield all([
    watchCreateAsync()
  ]);
}
