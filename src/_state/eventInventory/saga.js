// @flow
import { types } from '.';
import { put, takeLatest, call } from 'redux-saga/effects';
import { eventService } from '_services';
import type { Saga } from 'redux-saga';
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

    yield put({
      type: types.FETCH_EVENT_INVENTORY_SUCCESS,
      payload: eventInventory
    });
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_INVENTORY_ERROR, payload: err });
  }
}

export function* setRowListed(
  action: SetEventRowListedRequestAction
): Saga<void> {
  try {
    // What will be in this query?
    // const {} = action;
    // const updatedRow = yield call(eventService.updateInventoryRowListed, args);
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
