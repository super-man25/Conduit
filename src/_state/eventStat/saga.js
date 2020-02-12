import { put, takeLatest, call, select } from 'redux-saga/effects';
import actions, {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE,
  DOWNLOAD_EVENT_REPORT,
  DOWNLOAD_EVENT_REPORT_SUCCESS,
  DOWNLOAD_EVENT_REPORT_ERROR,
} from './actions';
import { eventStatService, transactionReportService } from '_services';
import { getEventStatFilterArguments } from './selectors';
import { selectors as eventSelectors } from '../event';
import { selectors as seasonSelectors } from '../season';
import { subMonths } from 'date-fns';
import alertActions from '_state/alert/actions';
import { saveAs } from 'file-saver';

// Workers
export function* setDefaultDateRange() {
  let from, to;
  const seasons = yield select(seasonSelectors.selectSeasons);
  const event = yield select(eventSelectors.selectEvent);

  const seasonForEvent =
    seasons.find((season) => season.id === event.seasonId) || {};
  const { startTimestamp: seasonStart } = seasonForEvent;
  const { timestamp: eventStart } = event;

  if (!seasonStart) {
    [from, to] = [subMonths(new Date(eventStart), 1), new Date(eventStart)];
  } else {
    [from, to] = [new Date(seasonStart), new Date(eventStart)];
  }

  yield put(actions.setDateRange({ from, to }));
}

export function* fetchEventTimeStats() {
  try {
    const { from, to } = yield select(getEventStatFilterArguments);
    const { id: eventId } = yield select(eventSelectors.selectEvent);

    const timeStatsResponse = yield call(eventStatService.getAll, {
      eventId,
      start: from,
      end: to,
    });
    yield put({ type: FETCH_SUCCESS, payload: timeStatsResponse });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

export function* downloadEventReport(action) {
  try {
    const { payload } = action;
    const blob = yield call(transactionReportService.downloadReport, payload);
    yield call(saveAs, blob, 'TransactionReport.csv');
    yield put({ type: DOWNLOAD_EVENT_REPORT_SUCCESS });
    yield put(alertActions.success('Report successfully downloaded'));
  } catch (err) {
    yield put({ type: DOWNLOAD_EVENT_REPORT_ERROR, payload: err });
    yield put(alertActions.error('Failed to download report'));
  }
}

// Sagas

// On initial fetch, set the default date range for this event this will trigger the
// setDateRange saga due to putting a SET_DATE_RANGE action
function* watchFetchEventStats() {
  yield takeLatest(FETCH_ASYNC, setDefaultDateRange);
}

function* watchSetDateRange() {
  yield takeLatest(SET_DATE_RANGE, fetchEventTimeStats);
}

function* watchDownloadEventReport() {
  yield takeLatest(DOWNLOAD_EVENT_REPORT, downloadEventReport);
}

export default {
  watchFetchEventStats,
  watchSetDateRange,
  watchDownloadEventReport,
};
