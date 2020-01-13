// @flow
import type { Saga } from 'redux-saga';
import { put, takeLatest, call } from 'redux-saga/effects';
import { types } from '.';
import type { FetchDemoPricesAction } from '.';
import { demoService } from '_services';

export function* fetchDemoPrices(action: FetchDemoPricesAction): Saga<void> {
  try {
    const { payload } = action;
    const priceResponse = yield call(demoService.getPrices, payload);

    yield put({ type: types.FETCH_SUCCESS, payload: priceResponse.prices });
  } catch (err) {
    yield put({ type: types.FETCH_ERROR, payload: err });
  }
}

function* fetchDemoPricesSaga(): Saga<void> {
  yield takeLatest(types.FETCH, fetchDemoPrices);
}

export default {
  fetchDemoPricesSaga,
};
