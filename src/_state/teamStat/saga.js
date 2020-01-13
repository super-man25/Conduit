import { put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_ASYNC, FETCH_ERROR, FETCH_SUCCESS } from './actions';
import { teamStatService } from '_services';

// Workers
export function* fetchTeamStatAsync() {
  try {
    const teamStats = yield call(teamStatService.getStats);
    yield put({ type: FETCH_SUCCESS, payload: teamStats });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchTeamStatAsync() {
  yield takeLatest(FETCH_ASYNC, fetchTeamStatAsync);
}

export default {
  watchFetchTeamStatAsync,
};
