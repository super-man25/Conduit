import { put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { priceRuleService } from '_services';
import alertActions from '../alert/actions';
import { types, selectors } from '.';

export function* fetchPriceRules() {
  try {
    const priceRules = yield call(priceRuleService.getAll);
    yield put({ type: types.FETCH_PRICE_RULES_SUCCESS, payload: priceRules });
  } catch (err) {
    yield put(alertActions.error('Failed to Fetch Price Rules'));
    yield put({ type: types.FETCH_PRICE_RULES_ERROR, payload: err });
  }
}

export function* savePriceRule() {
  try {
    const priceRule = yield select(selectors.selectEditingPriceRule);
    let result;
    if (priceRule.id !== 0) {
      result = yield call(priceRuleService.update, priceRule);
    } else {
      result = yield call(priceRuleService.create, priceRule);
    }
    yield put({ type: types.SAVE_PRICE_RULE_SUCCESS, payload: result });
    yield put(alertActions.success('Successfully saved price rule'));
  } catch (err) {
    yield put({ type: types.SAVE_PRICE_RULE_ERROR, payload: err });
    yield put(
      alertActions.error(err.toString() || 'Failed to Save Price Rule')
    );
  }
}

export function* fetchPriceRuleAfterSave(action) {
  yield put({ type: types.FETCH_PRICE_RULE, payload: action.payload });
}

export function* fetchOnePriceRule(action) {
  try {
    const result = yield call(priceRuleService.getOne, action.payload);

    yield put({ type: types.FETCH_PRICE_RULE_SUCCESS, payload: result });
  } catch (err) {
    yield put({ type: types.FETCH_PRICE_RULE_ERROR, payload: err });
  }
}

function* watchFetchPriceRules() {
  yield takeLatest(types.FETCH_PRICE_RULES, fetchPriceRules);
}

function* watchSavePriceRule() {
  yield takeEvery(types.SAVE_PRICE_RULE, savePriceRule);
}

function* watchFetchPriceRule() {
  yield takeEvery(types.FETCH_PRICE_RULE, fetchOnePriceRule);
}

// Fetch price rule whenever one is updated so it can be refreshed in the store
function* watchSavePriceRuleSuccess(action) {
  yield takeEvery(types.SAVE_PRICE_RULE_SUCCESS, fetchPriceRuleAfterSave);
}

export default {
  watchFetchPriceRules,
  watchSavePriceRule,
  watchFetchPriceRule,
  watchSavePriceRuleSuccess
};
