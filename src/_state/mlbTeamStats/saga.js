import { put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS } from './actions';
import { mlbTeamStatsService } from '_services';

// Workers
export function* fetchMLBTeamStatsAsync() {
  try {
    const teamStats = yield call(mlbTeamStatsService.getStats);
    yield put({ type: FETCH_SUCCESS, payload: teamStats });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchMLBTeamStatsAsync() {
  yield takeLatest(FETCH_ASYNC, fetchMLBTeamStatsAsync);
}

export default {
  watchFetchMLBTeamStatsAsync
};
