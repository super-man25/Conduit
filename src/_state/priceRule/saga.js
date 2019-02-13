import { put, call, takeLatest } from 'redux-saga/effects';
import { priceRuleService } from '_services';
import { types } from '.';

export function* fetchPriceRules() {
  try {
    const priceRules = yield call(priceRuleService.getAll);
    yield put({ type: types.FETCH_PRICE_RULES_SUCCESS, payload: priceRules });
  } catch (err) {
    yield put({ type: types.FETCH_PRICE_RULES_ERROR, payload: err });
  }
}

// Fetch price rule when user logs in
function* watchFetchPriceRules() {
  yield takeLatest(types.FETCH_PRICE_RULES, fetchPriceRules);
}

export default {
  watchFetchPriceRules
};
