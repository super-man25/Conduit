import { put, takeLatest, all, call } from 'redux-saga/effects';
import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS } from './actions';

import { eventService } from '../../_services';

// Workers
export function* fetchAsync() {
  try {
    const events = yield call(eventService.getAll);
    yield put({ type: FETCH_SUCCESS, payload: events });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchAsync() {
  yield takeLatest(FETCH_ASYNC, fetchAsync);
}

export default function* eventsSaga() {
  yield all([watchFetchAsync()]);
}
