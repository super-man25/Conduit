import { call, delay, put, takeLatest } from 'redux-saga/effects';
import * as t from './actions';
import { eventService } from '_services';

// Workers
function* fetchPricingPreview(action) {
  const { eventScore, eventId, spring } = action.payload;

  yield put({ type: t.FETCH_ASYNC });

  // Make request
  try {
    const pricingPreview = yield call(
      eventService.getPricingPreview,
      eventId,
      eventScore,
      spring
    );
    yield put({ type: t.FETCH_SUCCESS, payload: pricingPreview });
  } catch (err) {
    yield put({ type: t.FETCH_ERROR, payload: err });
  }
}

function* fetchPricingPreviewDebounced(action) {
  // Debounce request
  yield delay(200);
  yield put({ ...action, type: t.FETCH });
}

// Sagas
export function* watchFetchPricingPreview() {
  yield takeLatest(t.FETCH, fetchPricingPreview);
}

export function* watchParamsChanged() {
  yield takeLatest(t.PARAMS_CHANGED, fetchPricingPreviewDebounced);
}
