import { clientService, integrationService } from '_services';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getClientId, getClient } from './selectors';
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
  UPDATE_INTEGRATION
} from './actions';

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

export function* updateClientAsync({ payload: diff }) {
  try {
    const client = yield select(getClient);
    const updatedClient = yield call(clientService.updateClient, {
      ...client,
      ...diff
    });
    yield put({ type: UPDATE_SUCCESS, payload: updatedClient });
  } catch (err) {
    yield put({ type: UPDATE_ERROR, payload: err });
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
    isActive
  });
  yield put({ type: UPDATE_INTEGRATION, payload: { id, ...result } });
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

export default {
  watchGetClientAsync,
  watchUpdateClientAsync,
  watchGetClientIntegrationsAsync,
  watchToggleClientIntegrationAsync
};
