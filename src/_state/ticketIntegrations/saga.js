// @flow
import type { Saga } from 'redux-saga';
import { put, takeLatest, call } from 'redux-saga/effects';
import { integrationStatService } from '_services';
import { types } from '.';
import type { FetchAction } from '.';

export function* fetchTicketIntegrations(action: FetchAction): Saga {
  try {
    const { payload } = action;

    const ticketIntegrations = yield call(
      integrationStatService.getAll,
      payload
    );
    yield put({ type: types.FETCH_SUCCESS, payload: ticketIntegrations });
  } catch (err) {
    yield put({ type: types.FETCH_ERROR, payload: err });
  }
}

function* watchFetchTicketIntegrations(): Saga {
  yield takeLatest(types.FETCH, fetchTicketIntegrations);
}

export default {
  watchFetchTicketIntegrations,
};
