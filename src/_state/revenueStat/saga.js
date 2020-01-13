// @flow
import type { Saga } from 'redux-saga';
import { put, takeLatest, call } from 'redux-saga/effects';
import { types } from '.';
import type { FetchStatsAction } from '.';
import { revenueStatsService } from '_services';

export function* fetchRevenueBreakdown(action: FetchStatsAction): Saga<void> {
  try {
    const { payload } = action;
    const revenueBreakdown = yield call(revenueStatsService.getAll, payload);

    yield put({ type: types.FETCH_SUCCESS, payload: revenueBreakdown });
  } catch (err) {
    yield put({ type: types.FETCH_ERROR, payload: err });
  }
}

function* fetchRevenueBreakdownSaga(): Saga<void> {
  yield takeLatest(types.FETCH, fetchRevenueBreakdown);
}

export default {
  fetchRevenueBreakdownSaga,
};
