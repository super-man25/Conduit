import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_SUCCESS, FETCH_ERROR, FETCH } from './actions';
import { revenueStatsService } from '_services';

// TODO: Select current season/event when concept of season switching is introduced
export function* fetchRevenueBreakdown() {
  try {
    const revenueBreakdown = yield call(revenueStatsService.getAll, {
      seasonId: 1
    });

    yield put({ type: FETCH_SUCCESS, payload: revenueBreakdown });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

function* fetchRevenueBreakdownSaga() {
  yield takeLatest(FETCH, fetchRevenueBreakdown);
}

export default {
  fetchRevenueBreakdownSaga
};
