import { put, takeLatest, call, select } from 'redux-saga/effects';
import actions, {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE
} from './actions';
import { eventStatService } from '_services';
import { getSeasonStatFilterArguments } from './selectors';
import { selectors } from '../season';
import { subMonths } from 'date-fns';

// Workers
export function* setDefaultDateRange() {
  let from, to;
  const season = yield select(selectors.selectActiveSeason);

  if (!season.startTimestamp || !season.endTimestamp) {
    [from, to] = [subMonths(new Date(), 1), new Date()];
  } else {
    [from, to] = [
      new Date(season.startTimestamp),
      new Date(season.endTimestamp)
    ];
  }

  yield put(actions.setDateRange({ from, to }));
}

export function* fetchSeasonTimeStats(action) {
  try {
    let { from, to } = yield select(getSeasonStatFilterArguments);
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

// On initial fetch, set the default date range for this season this will trigger the
// setDateRange saga due to putting a SET_DATE_RANGE action
function* watchFetchEventStats() {
  yield takeLatest(FETCH_ASYNC, setDefaultDateRange);
}

function* watchSetDateRange() {
  yield takeLatest(SET_DATE_RANGE, fetchSeasonTimeStats);
}
export default {
  watchFetchEventStats,
  watchSetDateRange
};
