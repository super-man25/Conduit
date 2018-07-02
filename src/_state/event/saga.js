// @flow

import { eventService } from '_services';
import { delay } from 'redux-saga';
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  take
} from 'redux-saga/effects';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  SEARCH,
  VISIBLE_EVENTS,
  SET_BROADCASTING,
  SET_BROADCASTING_SUCCESS,
  SET_BROADCASTING_ERROR
} from './actions';
import type { SetBroadcastingAction } from './actions';
import { getEvents, getSearchFilter } from './selectors';
import Fuse from 'fuse.js';

import type { EDEvent } from '_models';

type Saga = Generator<any, any, any>;

let fuse;

export function initFuse(events: Array<EDEvent>) {
  const options = {
    shouldSort: false,
    threshold: 0.2,
    keys: ['name']
  };

  fuse = new Fuse(events, options);
}

export function fuzzySearch(filter: string): Array<EDEvent> {
  return fuse.search(filter);
}

export function findLatestEvent(events: Array<EDEvent>): EDEvent {
  return events.find((e) => e.timestamp > new Date());
}

// Workers
export function* fetchAsync(): Saga {
  try {
    const events = yield call(eventService.getAll);

    yield put({ type: FETCH_SUCCESS, payload: events });
    yield put({ type: VISIBLE_EVENTS, payload: events });
    yield call(initFuse, events);
  } catch (err) {
    yield put({ type: FETCH_ERROR, payload: err });
  }
}

export function* toggleBroadcasting(action: SetBroadcastingAction): Saga {
  try {
    const { eventId, isBroadcast } = action.payload;
    const response = yield call(
      eventService.toggleBroadcasting,
      eventId,
      isBroadcast
    );

    yield put({
      type: SET_BROADCASTING_SUCCESS,
      payload: { ...response, eventId }
    });
  } catch (err) {
    yield put({ type: SET_BROADCASTING_ERROR, payload: err });
  }
}

export function* handleSearchInput(): Saga {
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
function* watchFetchEventsAsync(): Saga {
  yield takeEvery(FETCH_ASYNC, fetchAsync);
}

// Only allow one SET_BROADCASTING event to be processed at a time to prevent
// getting out of sync
function* watchToggleBroadcasting(): Saga {
  while (true) {
    const action = yield take(SET_BROADCASTING);
    yield call(toggleBroadcasting, action);
  }
}

function* watchEventSearchInput(): Saga {
  yield takeLatest(SEARCH, handleSearchInput);
}

export default {
  watchFetchEventsAsync,
  watchToggleBroadcasting,
  watchEventSearchInput
};
