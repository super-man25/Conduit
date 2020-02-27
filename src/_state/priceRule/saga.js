import { put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';

import { priceRuleService, eventService } from '_services';
import { selectors as eventListSelectors } from '_state/eventList';
import alertActions from '../alert/actions';
import { selectors as seasonSelectors } from '../season';
import { types, selectors } from '.';

export function* fetchPriceRules() {
  try {
    const seasonId = yield select(seasonSelectors.selectActiveSeasonId);
    const priceRules = yield call(priceRuleService.getAll, { seasonId });
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

export function* deletePriceRule(action) {
  try {
    const result = yield call(priceRuleService.deletePriceRule, action.payload);

    yield put({ type: types.DELETE_PRICE_RULE_SUCCESS, payload: result });
    yield put({ type: types.FETCH_PRICE_RULES });
    yield put(alertActions.success('Price rule has been deleted'));
  } catch (err) {
    yield put({ type: types.DELETE_PRICE_RULE_ERROR, payload: err });
    yield put(
      alertActions.error(err.toString() || 'Error deleting price rule')
    );
  }
}

function* handleSavePriceRuleSuccess(action) {
  fetchPriceRuleAfterSave(action);
  const priceRule = yield select(selectors.selectEditingPriceRule);
  const eventList = yield select(eventListSelectors.selectEventList);
  let updatedEventCount = 0;
  yield put(
    alertActions.success(`Updating ${priceRule.eventIds.length} events...`, 0)
  );

  for (const eventId of priceRule.eventIds) {
    const event = eventList.find((event) => event.id === eventId);
    const {
      factors: {
        eventScoreModifier,
        springModifier,
        reasonType,
        reasonComments,
      },
    } = event;
    const isLastEventId =
      priceRule.eventIds[priceRule.eventIds.length - 1] === eventId;
    yield call(eventService.updateAdminModifiers, {
      eventId,
      eventScoreModifier,
      springModifier,
      reasonType,
      reasonComments,
    });
    yield put(
      alertActions.success(
        `Successfully updated ${++updatedEventCount} / ${
          priceRule.eventIds.length
        } events`,
        isLastEventId ? undefined : 0
      )
    );
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

function* watchDeletePriceRule() {
  yield takeLatest(types.DELETE_PRICE_RULE, deletePriceRule);
}

// Fetch price rule whenever one is updated so it can be refreshed in the store
function* watchSavePriceRuleSuccess(action) {
  yield takeEvery(types.SAVE_PRICE_RULE_SUCCESS, handleSavePriceRuleSuccess);
}

export default {
  watchFetchPriceRules,
  watchSavePriceRule,
  watchFetchPriceRule,
  watchSavePriceRuleSuccess,
  watchDeletePriceRule,
};
