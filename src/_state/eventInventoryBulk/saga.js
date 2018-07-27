import { select, takeLatest, call, put } from 'redux-saga/effects';
import { selectors, actions as eventInventoryActions } from '../eventInventory';
import { types } from '../eventInventoryBulk';
import { actions as alertActions } from '_state/alert';
import { eventService } from '_services';

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

  try {
    const res = yield call(eventService.updateEventSeats, {
      ...payload,
      eventSeatIds: selectedRowSeatIds
    });

    yield put({ type: types.SUBMIT_BULK_UPDATE_SUCCESS });
    yield put(alertActions.success(res.message));
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
