// @flow
import {
  fork,
  take,
  put,
  cancel,
  takeLatest,
  call,
  select,
  all
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { eventService, venueService } from '_services';
import { actions as alertActions } from '_state/alert';
import { selectors as eventSelectors } from '../event';
import {
  alphaFirstSort,
  findUniqueSections,
  mapSectionsToPriceScales
} from './utils';
import type {
  FetchEventInventoryAction,
  SetEventRowListedRequestAction,
  SaveEditedRowAction
} from './';
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

// export function* setOverridePrice(
//   action: SetEventRowPropertyRequestAction
// ): Saga<void> {
//   const { row, value } = action.payload;
//   const updateParams = {
//     eventSeatIds: row.seats,
//     overridePrice: value.length ? value : null
//   };

//   try {
//     yield call(eventService.updateEventSeats, updateParams);

//     yield put({
//       type: types.SAVE_EDITED_ROW_SUCCESS,
//       payload: action.payload
//     });
//   } catch (error) {
//     let msg =
//       error.name === 'ValidationError'
//         ? error.errors[0]
//         : `Could not update section ${row.section} row ${row.row}.`;

//     yield put(alertActions.error(msg));
//     yield put({
//       type: types.SAVE_EDITED_ROW_ERROR,
//       payload: {
//         error,
//         row
//       }
//     });
//   }
// }

export function* saveEditedRow(action: SaveEditedRowAction): Saga<void> {
  const editedRowId = select(eventInventorySelectors.selectEditedRowId);
  const editedRowState = select(eventInventorySelectors.selectEditedRowState);
  console.log('EDITED ROW STATE', editedRowState);
  const updateParams = {
    eventSeatIds: [editedRowId],
    overridePrice: editedRowState.overridePrice || null,
    minimumPrice: editedRowState.minimumPrice,
    maximumPrice: editedRowState.maximimumPrice
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
        : `Could not update seat ${editedRowId}.`;

    yield put(alertActions.error(msg));
    yield put({
      type: types.SAVE_EDITED_ROW_ERROR,
      payload: {
        error,
        editedRowId
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

function* watchSaveEditedRow(): Saga<void> {
  yield takeLatestById(
    types.SAVE_EDITED_ROW,
    saveEditedRow,
    (action) => action.payload.row.id
  );
}

export default {
  watchFetchEventInventory,
  watchSetRowListed,
  watchSaveEditedRow
};
