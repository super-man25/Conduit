import { put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS } from './actions';
import { mlbTeamStatService } from '_services';

// Workers
export function* fetchMLBTeamStatAsync() {
  try {
    const teamStats = yield call(mlbTeamStatService.getStats);
    yield put({ type: FETCH_SUCCESS, payload: teamStats });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchMLBTeamStatAsync() {
  yield takeLatest(FETCH_ASYNC, fetchMLBTeamStatAsync);
}

export default {
  watchFetchMLBTeamStatAsync
};
