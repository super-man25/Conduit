import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE
} from './actions';
import { eventStatService } from '_services';
import { getFilterArguments } from './selectors';

export const selectDateFilter = (state) => getFilterArguments(state.eventStat);

// Workers
// TODO: When current seasonId/eventId is stored, switch out static `1` id with selected season/eventId
export function* fetchEventStatsAsync(action) {
  try {
    const { from, to } = yield select(selectDateFilter);

    const events = yield call(eventStatService.getAll, 1, from, to);
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
