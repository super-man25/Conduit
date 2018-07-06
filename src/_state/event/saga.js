// @flow
import { eventService } from '_services';
import { call, put, takeLatest, take } from 'redux-saga/effects';
import { types } from '.';
import type { Saga } from 'redux-saga';
import type { ToggleEventBroadcastingAction, FetchEventAction } from '.';

// Workers
export function* fetchEvent(action: FetchEventAction): Saga {
  try {
    const { payload: eventId } = action;

    const event = yield call(eventService.getOne, eventId);
    yield put({ type: types.FETCH_EVENT_SUCCESS, payload: event });
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_ERROR, payload: err });
  }
}

export function* toggleBroadcasting(
  action: ToggleEventBroadcastingAction
): Saga {
  try {
    const { eventId, isBroadcast } = action.payload;
    const response = yield call(
      eventService.toggleBroadcasting,
      eventId,
      isBroadcast
    );

    yield put({
      type: types.TOGGLE_BROADCASTING_SUCCESS,
      payload: { ...response, eventId }
    });
  } catch (err) {
    yield put({ type: types.TOGGLE_BROADCASTING_ERROR, payload: err });
  }
}

// Sagas
function* watchFetchEvent(): Saga {
  yield takeLatest(types.FETCH_EVENT, fetchEvent);
}

// Only allow one SET_BROADCASTING event to be processed at a time to prevent
// getting out of sync
function* watchToggleBroadcasting(): Saga {
  while (true) {
    const action = yield take(types.TOGGLE_BROADCASTING);
    yield call(toggleBroadcasting, action);
  }
}

export default { watchFetchEvent, watchToggleBroadcasting };
