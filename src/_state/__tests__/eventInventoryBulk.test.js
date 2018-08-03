import {
  actions,
  types,
  reducer,
  initialState,
  selectors
} from '../eventInventoryBulk';
import { cloneableGenerator } from 'redux-saga/utils';
import { bulkUpdate } from '../eventInventoryBulk/saga';
import { select, all, call, put } from 'redux-saga/effects';
import {
  selectors as eventInventorySelectors,
  actions as eventInventoryActions
} from '_state/eventInventory';
import { actions as alertActions } from '_state/alert';
import { eventService } from '_services';
// import { put } from '_helpers/api';

describe('actions', () => {
  it('should create an action to start a bulk update', () => {
    const action = actions.startBulkUpdate();
    expect(action).toEqual({
      type: types.START_BULK_UPDATE
    });
  });

  it('should create an action to cancel a bulk update', () => {
    const action = actions.cancelBulkUpdate();
    expect(action).toEqual({
      type: types.CANCEL_BULK_UPDATE
    });
  });

  it('should create an action to submit a bulk update', () => {
    const action = actions.submitBulkUpdate({
      isListed: true,
      overridePrice: 10.0
    });
    expect(action).toEqual({
      type: types.SUBMIT_BULK_UPDATE,
      payload: { isListed: true, overridePrice: 10.0 }
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle START_BULK_UPDATE', () => {
    const prevState = { ...initialState };
    const action = actions.startBulkUpdate();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isBulkUpdating: true
    });
  });

  it('should handle CANCEL_BULK_UPDATE', () => {
    const prevState = { ...initialState };
    const action = actions.cancelBulkUpdate();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isBulkUpdating: false
    });
  });

  it('should handle SUBMIT_BULK_UPDATE', () => {
    const prevState = { ...initialState };
    const action = actions.submitBulkUpdate({
      isListed: true,
      overridePrice: 10.0
    });
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle SUBMIT_BULK_UPDATE_SUCCESS', () => {
    const prevState = { ...initialState };
    const action = { type: types.SUBMIT_BULK_UPDATE_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      isBulkUpdating: false
    });
  });

  it('should handle SUBMIT_BULK_UPDATE_ERROR', () => {
    const prevState = { ...initialState };
    const action = {
      type: types.SUBMIT_BULK_UPDATE_ERROR,
      payload: 'Some Error'
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      error: 'Some Error'
    });
  });
});

describe('selectors', () => {
  const store = {
    eventInventoryBulk: {
      loading: false,
      error: 'Some Error',
      isBulkUpdating: true
    }
  };

  it('isBulkUpdating selector should selector the isBulkUpdating state', () => {
    expect(selectors.isBulkUpdating(store)).toEqual(true);
  });

  it('isLoading selector should selector the isLoading state', () => {
    expect(selectors.isLoading(store)).toEqual(false);
  });

  it('getError selector should selector the error state', () => {
    expect(selectors.getError(store)).toEqual('Some Error');
  });
});

describe('saga workers', () => {
  it('bulkUpdate saga should handle bulk updates', () => {
    const action = actions.submitBulkUpdate({
      isListed: true,
      overridePrice: 10.0
    });
    const generator = cloneableGenerator(bulkUpdate)(action);

    expect(generator.next().value).toEqual(
      select(eventInventorySelectors.selectSelectedRows)
    );
    const selectedRows = [
      { seats: [1, 2, 3], eventId: 1 },
      { seats: [4, 5, 6], eventId: 1 }
    ];

    expect(generator.next(selectedRows).value).toEqual(
      all([
        call(eventService.updateEventSeats, {
          eventSeatIds: [1, 2, 3, 4, 5, 6],
          overridePrice: 10.0,
          isListed: true
        })
      ])
    );

    const fail = generator.clone();
    const error = new Error('some API Error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.SUBMIT_BULK_UPDATE_ERROR, payload: error })
    );

    expect(fail.next().value).toEqual(put(alertActions.error(error.message)));

    expect(generator.next().value).toEqual(
      put({
        type: types.SUBMIT_BULK_UPDATE_SUCCESS
      })
    );
    expect(generator.next().value).toEqual(
      put(alertActions.success('Bulk update successful'))
    );
    expect(generator.next().value).toEqual(
      put(eventInventoryActions.resetEventInventory())
    );
    expect(generator.next().value).toEqual(
      put(eventInventoryActions.fetchEventInventory(selectedRows[0].eventId))
    );
  });
});
