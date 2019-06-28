import { delay, put, takeEvery } from 'redux-saga/effects';
import { CLEAR, ERROR, ERROR_ASYNC, SUCCESS, SUCCESS_ASYNC } from './actions';

// Workers
export function* successAlertAsync(action) {
  const message = action.payload;
  yield put({ type: SUCCESS, payload: message });
  yield delay(3000);
  yield put({ type: CLEAR });
}

export function* errorAlertAsync(action) {
  const message = action.payload;
  yield put({ type: ERROR, payload: message });
  yield delay(3000);
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
