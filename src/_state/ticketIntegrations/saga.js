import { put, takeLatest, call } from 'redux-saga/effects';
import { integrationStatService } from '_services';
import { types } from '.';

export function* fetchTicketIntegrations() {
  try {
    const ticketIntegrations = yield call(integrationStatService.getAll, 1);
    yield put({ type: types.FETCH_SUCCESS, payload: ticketIntegrations });
  } catch (err) {
    yield put({ type: types.FETCH_ERROR, payload: err });
  }
}

function* watchFetchTicketIntegrations() {
  yield takeLatest(types.FETCH, fetchTicketIntegrations);
}

export default {
  watchFetchTicketIntegrations
};
