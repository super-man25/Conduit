import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE
} from './actions';
import { eventStatService } from '_services';
import { getEventStatFilterArguments } from './selectors';
import { selectors as eventSelectors } from '../event';

// Workers
export function* fetchEventStatsAsync(action) {
  try {
    const { from, to } = yield select(getEventStatFilterArguments);
    const activeEvent = yield select(eventSelectors.selectEvent);
    const { id: eventId } = activeEvent;

    const events = yield call(eventStatService.getAll, {
      eventId,
      start: from,
      end: to
    });
    yield put({ type: FETCH_SUCCESS, payload: events });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchEventStatsAsync() {
  yield takeLatest(FETCH_ASYNC, fetchEventStatsAsync);
}

function* watchSetDateFilter() {
  yield takeLatest(SET_DATE_RANGE, fetchEventStatsAsync);
}

export default {
  watchFetchEventStatsAsync,
  watchSetDateFilter
};
