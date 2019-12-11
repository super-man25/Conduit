import { onboardService } from '_services';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  ONBOARD_CLIENT_ASYNC,
  ONBOARD_CLIENT_SUCCESS,
  ONBOARD_CLIENT_ERROR
} from './actions';
import { actions as alertActions } from '../alert';

// Workers
export function* onboardClientAsync(action) {
  try {
    yield call(onboardService.onboardClient, action.payload);
    yield put({ type: ONBOARD_CLIENT_SUCCESS });
    yield put(alertActions.success('Successfully Onboarded Client'));
  } catch (error) {
    yield put({ type: ONBOARD_CLIENT_ERROR, payload: error });
    yield put(alertActions.error('Client Could Not Be Onboarded'));
  }
}

// Sagas
function* watchOnboardClientAsync() {
  yield takeEvery(ONBOARD_CLIENT_ASYNC, onboardClientAsync);
}

export default {
  watchOnboardClientAsync
};
