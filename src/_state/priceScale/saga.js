import { put, call, takeLatest } from 'redux-saga/effects';
import { priceScaleService } from '_services';
import { types } from '.';

export function* fetchPriceScales() {
  try {
    const priceScales = yield call(priceScaleService.getAll);
    yield put({ type: types.FETCH_PRICE_SCALES_SUCCESS, payload: priceScales });
  } catch (err) {
    yield put({ type: types.FETCH_PRICE_SCALES_ERROR, payload: err });
  }
}

// Fetch price scale when user logs in
function* watchFetchPriceScales() {
  yield takeLatest(types.FETCH_PRICE_SCALES, fetchPriceScales);
}

export default {
  watchFetchPriceScales
};
