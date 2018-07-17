// @flow
import { types, actions } from '.';
import { put, takeLatest, call } from 'redux-saga/effects';
import { eventService } from '_services';
import type { Saga } from 'redux-saga';
import { findUniqueKeys } from './utils';
import type {
  FetchEventInventoryAction,
  SetEventRowListedRequestAction
} from '.';

export function* fetchEventInventory(
  action: FetchEventInventoryAction
): Saga<void> {
  try {
    const eventId = action.payload;
    const eventInventory = yield call(eventService.getInventory, eventId);
    const priceScales = findUniqueKeys('priceScaleId', eventInventory);

    yield put({
      type: types.FETCH_EVENT_INVENTORY_SUCCESS,
      payload: eventInventory
    });

    yield put(actions.setScaleFilters(priceScales));
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_INVENTORY_ERROR, payload: err });
  }
}

export function* setRowListed(
  action: SetEventRowListedRequestAction
): Saga<void> {
  try {
    const { id, value } = action.payload;
    yield call(eventService.setEventRowListed, id, value);

    yield put({
      type: types.SET_EVENT_ROW_LISTED_SUCCESS,
      payload: action.payload
    });
  } catch (err) {
    yield put({ type: types.SET_EVENT_ROW_LISTED_ERROR, payload: err });
  }
}

function* watchFetchEventInventory(): Saga<void> {
  yield takeLatest(types.FETCH_EVENT_INVENTORY, fetchEventInventory);
}

function* watchSetRowListed(): Saga<void> {
  yield takeLatest(types.SET_EVENT_ROW_LISTED_REQUEST, setRowListed);
}

export default {
  watchFetchEventInventory,
  watchSetRowListed
};
