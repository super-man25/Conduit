import { clientService, integrationService } from '_services';
import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects';
import { getClientId } from './selectors';
import alertActions from '../alert/actions';
import { actions as authActions } from '_state/auth';
import {
  FETCH_ERROR,
  FETCH_ASYNC,
  FETCH_SUCCESS,
  UPDATE_ERROR,
  UPDATE_ASYNC,
  UPDATE_SUCCESS,
  FETCH_INTEGRATIONS_ASYNC,
  FETCH_INTEGRATIONS_SUCCESS,
  FETCH_INTEGRATIONS_ERROR,
  TOGGLE_INTEGRATION,
  UPDATE_INTEGRATION,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC_SUCCESS,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC_ERROR,
} from './actions';
import { RESET } from '../app/actions';

// Workers
export function* getClientAsync() {
  try {
    const clientId = yield select(getClientId);
    const client = yield call(clientService.getClient, clientId);
    yield put({ type: FETCH_SUCCESS, payload: client });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

export function* updateClientAsync({ payload: client }) {
  try {
    const authModel = yield call(clientService.setActiveClient, client.id);
    yield put(authActions.updateUser(authModel));
    yield put({ type: UPDATE_SUCCESS, payload: client });
    yield put({ type: RESET });
    yield put({ type: FETCH_INTEGRATIONS_ASYNC });
    yield put(alertActions.success('Successfully Updated Team Information'));
  } catch (err) {
    yield put({ type: UPDATE_ERROR, payload: err });
    yield put(alertActions.error('Team Information Could Not Be Updated'));
  }
}

export function* getIntegrationsAsync() {
  try {
    const integrations = yield call(integrationService.getIntegrations);
    yield put({ type: FETCH_INTEGRATIONS_SUCCESS, payload: integrations });
  } catch (err) {
    yield put({ type: FETCH_INTEGRATIONS_ERROR, payload: err });
  }
}

export function* toggleIntegrationAsync({ payload: { id, isActive } }) {
  const result = yield call(integrationService.toggleIntegration, id, {
    isActive,
  });
  yield put({ type: UPDATE_INTEGRATION, payload: { id, ...result } });
}

export function* updateSecondaryPricingRuleAsync(body) {
  const { onSuccess, onError, ...payload } = body.payload;
  try {
    yield call(integrationService.updateSecondaryPricingRule, payload);
    yield put({ type: UPDATE_SECONDARY_PRICING_RULE_ASYNC_SUCCESS });
    yield put({ type: FETCH_INTEGRATIONS_ASYNC });
    yield put(
      alertActions.success('Successfully Updated Secondary Pricing Rule')
    );
    onSuccess();
  } catch (err) {
    yield put({
      type: UPDATE_SECONDARY_PRICING_RULE_ASYNC_ERROR,
      payload: err,
    });
    yield put(alertActions.error(err.toString()));
    onError(err);
  }
}

// Sagas
function* watchGetClientAsync() {
  yield takeEvery(FETCH_ASYNC, getClientAsync);
}

function* watchUpdateClientAsync() {
  yield takeEvery(UPDATE_ASYNC, updateClientAsync);
}

function* watchGetClientIntegrationsAsync() {
  yield takeEvery(FETCH_INTEGRATIONS_ASYNC, getIntegrationsAsync);
}

function* watchToggleClientIntegrationAsync() {
  yield takeEvery(TOGGLE_INTEGRATION, toggleIntegrationAsync);
}

function* watchUpdateSecondaryPricingRuleAsync() {
  yield takeLatest(
    UPDATE_SECONDARY_PRICING_RULE_ASYNC,
    updateSecondaryPricingRuleAsync
  );
}

export default {
  watchGetClientAsync,
  watchUpdateClientAsync,
  watchGetClientIntegrationsAsync,
  watchToggleClientIntegrationAsync,
  watchUpdateSecondaryPricingRuleAsync,
};
