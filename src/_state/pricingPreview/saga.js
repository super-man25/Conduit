import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import * as t from './actions';
import { eventService } from '_services';
import { selectors as eventSelectors } from '_state/event';
// Workers
export function* fetchPricingPreview(action) {
  const { eventId } = action.payload;
  const {
    eventScore,
    eventScoreModifier,
    spring,
    springModifier
  } = yield select(eventSelectors.selectPendingFactors);

  const newEventScore = eventScore + (+eventScoreModifier || 0);
  const newSpring = spring + (+springModifier || 0);

  yield put({ type: t.FETCH_ASYNC });

  // Make request
  try {
    const pricingPreview = yield call(
      eventService.getPricingPreview,
      eventId,
      newEventScore,
      newSpring
    );
    yield put({ type: t.FETCH_SUCCESS, payload: pricingPreview });
  } catch (err) {
    yield put({ type: t.FETCH_ERROR, payload: err });
  }
}

export function* fetchPricingPreviewDebounced(action) {
  // Debounce request
  yield delay(200);
  yield put({ ...action, type: t.FETCH });
}

// Sagas
function* watchFetchPricingPreview() {
  yield takeLatest(t.FETCH, fetchPricingPreview);
}

function* watchParamsChanged() {
  yield takeLatest(t.PARAMS_CHANGED, fetchPricingPreviewDebounced);
}

export default {
  watchFetchPricingPreview,
  watchParamsChanged
};
