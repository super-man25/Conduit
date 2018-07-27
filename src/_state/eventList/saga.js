// @flow

import { eventService } from '_services';
import { delay } from 'redux-saga';
import type { Saga } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { types, selectors, actions } from '.';
import type { FetchEventListAction } from '.';
import Fuse from 'fuse.js';
import type { EDEvent } from '_models';

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

// Workers
export function* fetchAsync(action: FetchEventListAction): Saga {
  try {
    const { payload } = action;
    const events = yield call(eventService.getAll, payload);

    const sorted = events.slice().sort((a, b) => {
      return a.timestamp > b.timestamp ? 1 : -1;
    });

    yield put({ type: types.FETCH_EVENT_LIST_SUCCESS, payload: sorted });
    yield put(actions.setVisibleEvents(sorted));
    yield call(initFuse, events);
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_LIST_ERROR, payload: err });
  }
}

export function* handleSearchInput(): Saga {
  yield call(delay, 500);

  const filter = yield select(selectors.selectEventListSearchFilter);

  if (!filter) {
    const events = yield select(selectors.selectEventList);

    yield put(actions.setVisibleEvents(events));

    return;
  }

  const result = yield call(fuzzySearch, filter);
  yield put(actions.setVisibleEvents(result));
}

// Sagas
function* watchFetchEventsAsync(): Saga {
  yield takeEvery(types.FETCH_EVENT_LIST, fetchAsync);
}

function* watchEventSearchInput(): Saga {
  yield takeLatest(types.SEARCH, handleSearchInput);
}

export default {
  watchFetchEventsAsync,
  watchEventSearchInput
};