// @flow

import { eventService } from '_services';
import type { Saga } from 'redux-saga';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { types, selectors, actions } from '.';
import type { FetchEventListAction } from '.';
import Fuse from 'fuse.js';
import type { EDEvent } from '_models';

let fuse;

export function initFuse(events: Array<EDEvent>) {
  const options = {
    shouldSort: false,
    threshold: 0.2,
    keys: ['name'],
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

    const serializedEvents = events
      .slice()
      .sort((a, b) => {
        return a.timestamp > b.timestamp ? 1 : -1;
      })
      .map((event) => {
        const eventFactorsObjectKeys = Object.keys(event.factors);
        if (eventFactorsObjectKeys.includes('eventScoreTrend')) return event;
        else
          return {
            ...event,
            factors: {
              ...event.factors,
              eventScoreTrend: null,
            },
          };
      });
    console.log('SERIALIZED', serializedEvents);
    yield put({
      type: types.FETCH_EVENT_LIST_SUCCESS,
      payload: serializedEvents,
    });
    yield put(actions.setVisibleEvents(serializedEvents));
    yield call(initFuse, events);
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_LIST_ERROR, payload: err });
  }
}

export function* handleSearchInput(): Saga {
  yield delay(500);

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
  yield takeLatest(types.FETCH_EVENT_LIST, fetchAsync);
}

function* watchEventSearchInput(): Saga {
  yield takeLatest(types.SEARCH, handleSearchInput);
}

export default {
  watchFetchEventsAsync,
  watchEventSearchInput,
};
