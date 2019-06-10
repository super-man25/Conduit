// @flow
import { eventService } from '_services';
import { call, put, takeLatest, take } from 'redux-saga/effects';
import { types } from '.';
import { types as eventListTypes } from '_state/eventList';
import type { Saga } from 'redux-saga';
import type {
  ToggleEventBroadcastingAction,
  FetchEventAction,
  SaveAdminModifiersAction,
  FetchAutomatedSpringValueAction
} from '.';
import { paramsChanged } from '_state/pricingPreview/actions';
import alertActions from '../alert/actions';

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

export function* saveAdminModifiers(action: SaveAdminModifiersAction): Saga {
  const {
    eventId,
    eventScoreModifier,
    springModifier,
    seasonId
  } = action.payload;
  try {
    const response = yield call(
      eventService.updateAdminModifiers,
      eventId,
      eventScoreModifier,
      springModifier
    );

    yield put({
      type: types.SAVE_ADMIN_MODIFIERS_SUCCESS,
      payload: { ...response, eventId }
    });
    yield put(alertActions.success('Successfully saved modifier'));
    yield put({
      type: eventListTypes.FETCH_EVENT_LIST,
      payload: { seasonId }
    });
  } catch (err) {
    yield put({ type: types.SAVE_ADMIN_MODIFIERS_ERROR, payload: err });
    yield put(alertActions.error(err.toString() || 'Failed to save modifier'));
  }
}

export function* fetchAutomatedSpring(
  action: FetchAutomatedSpringValueAction
): Saga {
  const { id, eventScore } = action.payload;
  try {
    const springValue = yield call(
      eventService.getAutomatedSpringValue,
      id,
      eventScore
    );
    yield put({
      type: types.FETCH_AUTOMATED_SPRING_VALUE_SUCCESS,
      payload: springValue * 100
    });
    yield put(paramsChanged(id));
  } catch (err) {
    yield put({ type: types.FETCH_AUTOMATED_SPRING_VALUE_ERROR, payload: err });
    yield put(paramsChanged(id));
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

function* watchSaveAdminModifiers(): Saga {
  yield takeLatest(types.SAVE_ADMIN_MODIFIERS, saveAdminModifiers);
}

function* watchFetchAutomatedSpring(): Saga {
  yield takeLatest(types.FETCH_AUTOMATED_SPRING_VALUE, fetchAutomatedSpring);
}

export default {
  watchFetchEvent,
  watchToggleBroadcasting,
  watchSaveAdminModifiers,
  watchFetchAutomatedSpring
};
