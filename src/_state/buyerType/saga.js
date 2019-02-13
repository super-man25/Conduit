import { put, call, takeLatest } from 'redux-saga/effects';
import { buyerTypeService } from '_services';
import { types } from '.';

export function* fetchBuyerTypes() {
  try {
    const buyerTypes = yield call(buyerTypeService.getAll);
    yield put({ type: types.FETCH_BUYER_TYPES_SUCCESS, payload: buyerTypes });
  } catch (err) {
    yield put({ type: types.FETCH_BUYER_TYPES_ERROR, payload: err });
  }
}

// Fetch buyer type when user logs in
function* watchFetchBuyerTypes() {
  yield takeLatest(types.FETCH_BUYER_TYPES, fetchBuyerTypes);
}

export default {
  watchFetchBuyerTypes
};
