import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { buyerTypeService } from '_services';
import { types } from '.';
import alertActions from '../alert/actions';

export function* fetchBuyerTypes(action) {
  try {
    const { payload } = action;
    const buyerTypes = yield call(buyerTypeService.getAll, payload);
    yield put({ type: types.FETCH_BUYER_TYPES_SUCCESS, payload: buyerTypes });
  } catch (err) {
    yield put(alertActions.error('Failed to Fetch Buyer Types'));
    yield put({ type: types.FETCH_BUYER_TYPES_ERROR, payload: err });
  }
}

export function* updateBuyerTypes(action) {
  try {
    const result = yield call(buyerTypeService.updateMultiple, action.payload);
    yield put({ type: types.UPDATE_BUYER_TYPES_SUCCESS, payload: result });
    yield put(alertActions.success('Updated Buyer Types'));
  } catch (err) {
    yield put({ type: types.UPDATE_BUYER_TYPES_ERROR, payload: err });
  }
}

function* watchFetchBuyerTypes() {
  yield takeLatest(types.FETCH_BUYER_TYPES, fetchBuyerTypes);
}

function* watchUpdateBuyerTypes() {
  yield takeEvery(types.UPDATE_BUYER_TYPES, updateBuyerTypes);
}

function* watchUpdatedBuyerTypesSuccessfully() {
  yield takeLatest(types.UPDATE_BUYER_TYPES_SUCCESS, fetchBuyerTypes);
}

export default {
  watchFetchBuyerTypes,
  watchUpdateBuyerTypes,
  watchUpdatedBuyerTypesSuccessfully
};
