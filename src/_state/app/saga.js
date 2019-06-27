import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UPDATE_ASYNC, UPDATE_SUCCESS } from '_state/client/actions';
import { actions as buyerTypeActions } from '_state/buyerType';
import { actions as eventActions } from '_state/event';
import { actions as eventCategoryActions } from '_state/eventCategory';
import { actions as eventListActions } from '_state/eventList';
import { actions as priceRuleActions } from '_state/priceRule';
import { actions as priceScaleActions } from '_state/priceScale';
import { actions as seasonActions } from '_state/season';
import { actions as teamStatActions } from '_state/teamStat';

// Workers
function* globalReset() {
  try {
    yield put(eventActions.resetEvent());
    yield put(eventListActions.resetEventList());
    yield put(seasonActions.resetSeasons());
    yield put(teamStatActions.resetTeamStat());

    //If on pricing rules page
    yield put(priceRuleActions.resetPriceRules());
    yield put(buyerTypeActions.resetBuyerTypes());
    yield put(priceScaleActions.resetPriceScales());
    yield put(eventCategoryActions.resetEventCategories());
  } catch (err) {
    console.warn(err);
  }
}

function* globalReInit() {
  try {
    yield put(push('/'));
    yield put(eventListActions.fetchEventList());
    yield put(seasonActions.fetchSeasons());
    yield put(teamStatActions.fetch());
  } catch (err) {
    console.warn(err);
  }
}

// Sagas
function* watchGlobalReset() {
  yield takeEvery(UPDATE_ASYNC, globalReset);
  yield takeEvery(UPDATE_SUCCESS, globalReInit);
}

export default {
  watchGlobalReset
};
