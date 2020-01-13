import { put, takeLatest, call, select } from 'redux-saga/effects';
import actions, {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SET_DATE_RANGE,
  DOWNLOAD_SEASON_REPORT,
  DOWNLOAD_SEASON_REPORT_SUCCESS,
  DOWNLOAD_SEASON_REPORT_ERROR,
} from './actions';
import { eventStatService, transactionReportService } from '_services';
import { getSeasonStatFilterArguments } from './selectors';
import { selectors } from '../season';
import { subMonths } from 'date-fns';
import alertActions from '_state/alert/actions';
import { saveAs } from 'file-saver';

// Workers
export function* setDefaultDateRange() {
  let from, to;
  const season = yield select(selectors.selectActiveSeason);

  if (!season.startTimestamp || !season.endTimestamp) {
    [from, to] = [subMonths(new Date(), 1), new Date()];
  } else {
    [from, to] = [
      new Date(season.startTimestamp),
      new Date(season.endTimestamp),
    ];
  }

  yield put(actions.setDateRange({ from, to }));
}

export function* fetchSeasonTimeStats(action) {
  try {
    let { from, to } = yield select(getSeasonStatFilterArguments);
    const seasonId = yield select(selectors.selectActiveSeasonId);

    const timeStatsResponse = yield call(eventStatService.getAll, {
      seasonId,
      start: from,
      end: to,
    });
    yield put({ type: FETCH_SUCCESS, payload: timeStatsResponse });
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

export function* downloadSeasonReport(action) {
  try {
    const { payload } = action;
    const blob = yield call(transactionReportService.downloadReport, payload);
    yield call(saveAs, blob, 'TransactionReport.csv');
    yield put({ type: DOWNLOAD_SEASON_REPORT_SUCCESS });
    yield put(alertActions.success('Report successfully downloaded'));
  } catch (err) {
    yield put({ type: DOWNLOAD_SEASON_REPORT_ERROR, payload: err });
    yield put(alertActions.error('Failed to download report'));
  }
}

// Sagas

// On initial fetch, set the default date range for this season this will trigger the
// setDateRange saga due to putting a SET_DATE_RANGE action
function* watchFetchEventStats() {
  yield takeLatest(FETCH_ASYNC, setDefaultDateRange);
}

function* watchSetDateRange() {
  yield takeLatest(SET_DATE_RANGE, fetchSeasonTimeStats);
}

function* watchDownloadSeasonReport() {
  yield takeLatest(DOWNLOAD_SEASON_REPORT, downloadSeasonReport);
}

export default {
  watchFetchEventStats,
  watchSetDateRange,
  watchDownloadSeasonReport,
};
