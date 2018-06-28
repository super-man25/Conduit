import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { SUCCESS_ASYNC, ERROR_ASYNC, SUCCESS, ERROR, CLEAR } from './actions';

// Workers
export function* successAlertAsync(action) {
  const message = action.payload;
  yield put({ type: SUCCESS, payload: message });
  yield call(delay, 3000);
  yield put({ type: CLEAR });
}

export function* errorAlertAsync(action) {
  const message = action.payload;
  yield put({ type: ERROR, payload: message });
  yield call(delay, 3000);
  yield put({ type: CLEAR });
}

// Sagas
function* watchSuccessAlertAsync() {
  yield takeEvery(SUCCESS_ASYNC, successAlertAsync);
}

function* watchErrorAlertAsync() {
  yield takeEvery(ERROR_ASYNC, errorAlertAsync);
}

export default {
  watchSuccessAlertAsync,
  watchErrorAlertAsync
};
