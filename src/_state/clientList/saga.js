import actions, { FETCH_CLIENT_LIST } from './actions';
import { clientService } from '_services';
import { call, put, takeEvery } from 'redux-saga/effects';

export function* getClientListAsync() {
  try {
    const clientList = yield call(clientService.getClientList);
    yield put(actions.fetchClientListSuccess(clientList));
  } catch (err) {
    yield put(actions.fetchClientListError(err));
  }
}

function* watchGetClientListAsync() {
  yield takeEvery(FETCH_CLIENT_LIST, getClientListAsync);
}

export default {
  watchGetClientListAsync,
};
