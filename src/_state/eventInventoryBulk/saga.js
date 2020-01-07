import { select, takeLatest, call, put, all } from 'redux-saga/effects';

import { ROW_SEATS_NETWORK_CHUNK_SIZE } from '_constants';
import { chunk } from '_helpers';
import { eventService } from '_services';
import { actions as alertActions } from '_state/alert';
import { selectors as eventSelectors } from '../event';
import { types } from '../eventInventoryBulk';
import { selectors, actions as eventInventoryActions } from '../eventInventory';

export function* bulkUpdate(action) {
  const { payload } = action;

  if (payload.overridePrice === '') {
    payload.overridePrice = null;
  }
  const selectedRows = yield select(selectors.selectSelectedRows);
  const selectedRowSeatIds = selectedRows.reduce(
    (acc, row) => acc.concat(row.seats),
    []
  );

  const chunkedRowSeatIds = chunk(
    selectedRowSeatIds,
    ROW_SEATS_NETWORK_CHUNK_SIZE
  );

  try {
    yield all(
      chunkedRowSeatIds.map((seatIds) =>
        call(eventService.updateEventSeats, {
          ...payload,
          eventSeatIds: seatIds
        })
      )
    );

    yield put({ type: types.SUBMIT_BULK_UPDATE_SUCCESS });
    yield put(alertActions.success('Bulk update successful'));
    yield put(eventInventoryActions.resetEventInventory());
    yield put(
      eventInventoryActions.fetchEventInventory(selectedRows[0].eventId)
    );
  } catch (err) {
    yield put({ type: types.SUBMIT_BULK_UPDATE_ERROR, payload: err });
    yield put(alertActions.error(err.message));
  }
}

function* watchBulkUpdate() {
  yield takeLatest(types.SUBMIT_BULK_UPDATE, bulkUpdate);
}

export default {
  watchBulkUpdate
};
