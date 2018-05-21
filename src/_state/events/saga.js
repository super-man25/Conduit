import { eventService } from '_services';
import { delay } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SEARCH,
  VISIBLE_EVENTS
} from './actions';
import { getEvents, getSearchFilter } from './selectors';
import Fuse from 'fuse.js';

let fuse;

export function initFuse(events) {
  const options = {
    shouldSort: false,
    threshold: 0.3,
    keys: ['name']
  };

  fuse = new Fuse(events, options);
}

export function fuzzySearch(filter) {
  return fuse.search(filter);
}

export function findLatestEvent(events) {
  return events.find((e) => e.timestamp > new Date());
}

// Workers
export function* fetchAsync() {
  try {
    const events = yield call(eventService.getAll);

    yield put({ type: FETCH_SUCCESS, payload: events });
    yield put({ type: VISIBLE_EVENTS, payload: events });
    yield call(initFuse, events);
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

export function* handleSearchInput() {
  yield call(delay, 500);

  const filter = yield select(getSearchFilter);

  if (!filter) {
    const events = yield select(getEvents);

    yield put({ type: VISIBLE_EVENTS, payload: events });

    return;
  }

  const result = yield call(fuzzySearch, filter);
  yield put({ type: VISIBLE_EVENTS, payload: result });
}

// Sagas
function* watchFetchEventsAsync() {
  yield takeEvery(FETCH_ASYNC, fetchAsync);
}

function* watchEventSearchInput() {
  yield takeLatest(SEARCH, handleSearchInput);
}

export default {
  watchFetchEventsAsync,
  watchEventSearchInput
};
