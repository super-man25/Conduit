// @flow
import { types, actions } from '.';
import { fork, take, put, cancel, takeLatest, call } from 'redux-saga/effects';
import { eventService } from '_services';
import type { Saga } from 'redux-saga';
import { findUniqueKeys } from './utils';
import { actions as alertActions } from '_state/alert';
import type {
  FetchEventInventoryAction,
  SetEventRowListedRequestAction,
  SetEventRowManualPriceRequestAction
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
  const { row, value } = action.payload;
  const updateParams = { eventSeatIds: row.seats, isListed: value };

  try {
    yield call(eventService.updateEventSeats, updateParams);

    yield put({
      type: types.SET_EVENT_ROW_LISTED_SUCCESS,
      payload: action.payload
    });
  } catch (error) {
    yield put(
      alertActions.error(
        `Could not update section ${row.section} row ${row.row}.`
      )
    );
    yield put({
      type: types.SET_EVENT_ROW_LISTED_ERROR,
      payload: {
        error,
        row
      }
    });
  }
}

export function* setOverridePrice(
  action: SetEventRowManualPriceRequestAction
): Saga<void> {
  const { row, value } = action.payload;
  const updateParams = {
    eventSeatIds: row.seats,
    overridePrice: value.length ? value : null
  };

  try {
    yield call(eventService.updateEventSeats, updateParams);

    yield put({
      type: types.SET_EVENT_ROW_MANUAL_PRICE_SUCCESS,
      payload: action.payload
    });
  } catch (error) {
    yield put(
      alertActions.error(
        `Could not update section ${row.section} row ${row.row}.`
      )
    );
    yield put({
      type: types.SET_EVENT_ROW_MANUAL_PRICE_ERROR,
      payload: {
        error,
        row
      }
    });
  }
}

const takeLatestById = (pattern, saga, actionIdGetter, ...args) =>
  fork(function*() {
    const tasks = {};

    while (true) {
      const action = yield take(pattern);
      const id = actionIdGetter(action);

      if (tasks[id]) {
        yield cancel(tasks[id]);
      }

      tasks[id] = yield fork(saga, action);
    }
  });

function* watchFetchEventInventory(): Saga<void> {
  yield takeLatest(types.FETCH_EVENT_INVENTORY, fetchEventInventory);
}

function* watchSetRowListed(): Saga<void> {
  yield takeLatestById(
    types.SET_EVENT_ROW_LISTED_REQUEST,
    setRowListed,
    (action) => action.payload.row.id
  );
}

function* watchSetManualPrice(): Saga<void> {
  yield takeLatestById(
    types.SET_EVENT_ROW_MANUAL_PRICE_REQUEST,
    setOverridePrice,
    (action) => action.payload.row.id
  );
}

export default {
  watchFetchEventInventory,
  watchSetRowListed,
  watchSetManualPrice
};
