import { call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR } from './actions';
import { eventScoreHistoryService } from '_services';

function* fetchEventScoreHistory(action) {
  const { eventId, startDate, endDate } = action.payload;
  if (!eventId || !startDate || !endDate) return;
  try {
    const eventScoreHistoryResponse = yield call(
      eventScoreHistoryService.getEventScoreHistory,
      {
        eventId,
        startDate,
        endDate
      }
    );
    yield put({ type: FETCH_SUCCESS, payload: eventScoreHistoryResponse });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
  }
}

function* watchFetchAsync() {
  yield takeLatest(FETCH_ASYNC, fetchEventScoreHistory);
}

export default {
  watchFetchAsync
};
