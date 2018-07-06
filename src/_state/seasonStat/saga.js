import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE
} from './actions';
import { eventStatService } from '_services';
import { getSeasonStatFilterArguments } from './selectors';
import { selectors } from '../season';

// Workers
// TODO: When current seasonId/eventId is stored, switch out static `1` id with selected season/eventId
export function* fetchSeasonTimeStats(action) {
  try {
    const { from, to } = yield select(getSeasonStatFilterArguments);
    const seasonId = yield select(selectors.selectActiveSeasonId);

    const events = yield call(eventStatService.getAll, {
      seasonId,
      start: from,
      end: to
    });
    yield put({ type: FETCH_SUCCESS, payload: events });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchSeasonStatsAsync() {
  yield takeLatest(FETCH_ASYNC, fetchSeasonTimeStats);
}

function* watchSetSeasonStatDateFilter() {
  yield takeLatest(SET_DATE_RANGE, fetchSeasonTimeStats);
}

export default {
  watchFetchSeasonStatsAsync,
  watchSetSeasonStatDateFilter
};
