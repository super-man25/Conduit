import { put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS } from './actions';
import { eventStatService } from '_services';

// Workers
export function* fetchEventStatsAsync() {
  try {
    const events = yield call(eventStatService.getAll);
    yield put({ type: FETCH_SUCCESS, payload: events });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchEventStatsAsync() {
  yield takeLatest(FETCH_ASYNC, fetchEventStatsAsync);
}

export default {
  watchFetchEventStatsAsync
};
