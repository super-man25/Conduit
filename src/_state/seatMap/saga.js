import { types, actions } from '.';
import { venueService } from '_services';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { selectors } from '../event';

// By default images/objects/embeds will not request for resources using a CORS policy
// So we have to fetch the url here. Otherwise we will encounter a browser security error
// in modern browsers
export function fetchImageAndCreateObjectUrl(url) {
  return fetch(url)
    .then((s) => s.blob())
    .then((s) => window.URL.createObjectURL(s));
}

export function* fetchSeatMap() {
  try {
    const event = yield select(selectors.selectEvent);

    const venue = yield call(venueService.getOne, event.venueId);

    const objUrl = yield call(fetchImageAndCreateObjectUrl, venue.svgUrl);
    yield put(actions.fetchSeatMapSuccess({ venue, objUrl }));
  } catch (err) {
    yield put(actions.fetchSeatMapError(err));
  }
}

function* watchFetchSeatMap() {
  yield takeLatest(types.FETCH_SEAT_MAP_REQUEST, fetchSeatMap);
}

export default { watchFetchSeatMap };
