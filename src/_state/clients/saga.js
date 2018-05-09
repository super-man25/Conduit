import { clientService } from '_services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ERROR, SUCCESS } from '../alert/actions';
import { store } from '../store';
import {
  GET_FAILURE,
  GET_REQUEST,
  GET_SUCCESS,
  UPDATE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS
} from './actions';

// Workers
export function* getClientAsync() {
  try {
    const client = yield call(clientService.getClient); // call a function and return the response
    yield put({ type: GET_SUCCESS, payload: client }); // if it succeeded, dispatch an action to store
  } catch (err) {
    yield put({ type: ERROR, payload: err });
    yield put({ type: GET_FAILURE, payload: err }); // if it failed, dispatch an action to store
  }
}

export function* updateClientAsync(action) {
  // here we need to make an 'update' client from attribute, value and the current state.client
  const attribute = action.attribute;
  const value =
    attribute !== 'name' ? parseInt(action.value, 10) : action.value;
  const currentClient = store.getState().client;
  const proposedClient = {
    id: currentClient.id,
    name: currentClient.name,
    pricingInterval: parseInt(currentClient.pricingInterval, 10)
  };
  proposedClient[attribute] = value;

  try {
    const client = yield call(clientService.updateClient, proposedClient);
    yield put({ type: UPDATE_SUCCESS, payload: client });
    yield put({ type: SUCCESS, payload: 'Client successfully updated!' });
  } catch (err) {
    yield put({ type: UPDATE_FAILURE, payload: err });
    yield put({ type: ERROR, payload: err });
  }
}

// Sagas
function* watchGetClientAsync() {
  yield takeEvery(GET_REQUEST, getClientAsync);
}

function* watchUpdateClientAsync() {
  yield takeEvery(UPDATE_REQUEST, updateClientAsync);
}

export default {
  watchGetClientAsync,
  watchUpdateClientAsync
};
