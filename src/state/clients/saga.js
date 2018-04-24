import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from './actions';

import { clientsService } from '../../_services';

// Workers
export function* getAsync() {
  try {
    const client = yield call(clientsService.getClient);
    yield put({ type: GET_SUCCESS, payload: client });
  } catch (err) {
    yield put({ type: GET_FAILURE, payload: err });
  }
}

// Sagas
function* watchGetAsync() {
  yield takeLatest(GET_REQUEST, getAsync);
}

export default function* clientsSaga() { //  significance of * ?
  yield all([
    watchGetAsync() //  what about watchUpdateAsync() ?
  ]);
}
