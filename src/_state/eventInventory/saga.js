// @flow
import { put, takeLatest, call, select, all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { eventService, venueService } from '_services';
import { actions as alertActions } from '_state/alert';
import { selectors as eventSelectors } from '../event';
import {
  alphaFirstSort,
  findUniqueSections,
  mapSectionsToPriceScales
} from './utils';
import type { FetchEventInventoryAction } from './';
import { types, actions, selectors as eventInventorySelectors } from './';

export function* fetchEventInventory(
  action: FetchEventInventoryAction
): Saga<void> {
  try {
    const { id, venueId } = yield select(eventSelectors.selectEvent);

    const [eventInventory, priceScales] = yield all([
      call(eventService.getInventory, id),
      call(venueService.getPriceScales, venueId)
    ]);
    yield put(
      actions.setSectionsToPriceScaleAction(
        yield call(mapSectionsToPriceScales, eventInventory)
      )
    );
    const sortedPriceScales = alphaFirstSort(priceScales, 'name');

    yield put(actions.setScaleFilters(sortedPriceScales));
    yield put(
      actions.setSectionFilters(yield call(findUniqueSections, eventInventory))
    );
    yield put({
      type: types.FETCH_EVENT_INVENTORY_SUCCESS,
      payload: eventInventory
    });
    yield put({
      type: types.SET_EVENT_INVENTORY_FILTER,
      payload: 'priceScaleId'
    });
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_INVENTORY_ERROR, payload: err });
  }
}

export function* saveEditedRow(): Saga<void> {
  const editedRowSeatIds = yield select(
    eventInventorySelectors.selectEditedRowSeatIds
  );
  const editedRowState = yield select(
    eventInventorySelectors.selectEditedRowState
  );

  const updateParams = {
    eventSeatIds: editedRowSeatIds,
    overridePrice: editedRowState.overridePrice || null, // TODO: remove `|| null`
    minimumPrice: editedRowState.minimumPrice,
    maximumPrice: editedRowState.maximimumPrice,
    isListed: editedRowState.isListed
  };

  try {
    yield call(eventService.updateEventSeats, updateParams);

    yield put({
      type: types.SAVE_EDITED_ROW_SUCCESS
    });
  } catch (error) {
    let msg =
      error.name === 'ValidationError'
        ? error.errors[0]
        : `Could not update seats.`;

    yield put(alertActions.error(msg));
    yield put({
      type: types.SAVE_EDITED_ROW_ERROR,
      payload: {
        error,
        editedRowSeatIds
      }
    });
  }
}

function* watchFetchEventInventory(): Saga<void> {
  yield takeLatest(types.FETCH_EVENT_INVENTORY, fetchEventInventory);
}

function* watchSaveEditedRow(): Saga<void> {
  yield takeLatest(types.SAVE_EDITED_ROW, saveEditedRow);
}

export default {
  watchFetchEventInventory,
  watchSaveEditedRow
};
