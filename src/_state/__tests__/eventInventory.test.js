import {
  actions,
  types,
  reducer,
  initialState,
  selectors
} from '../eventInventory';
import { selectors as eventSelectors } from '../event';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchEventInventory } from '../eventInventory/saga';
import { call, put, all, select } from 'redux-saga/effects';
import { eventService, venueService } from '_services';
import {
  findUniqueSections,
  mapSectionsToPriceScales
} from '../eventInventory/utils';

describe('actions', () => {
  it('should create an action to fetch an events inventory', () => {
    const action = actions.fetchEventInventory(1);
    expect(action).toEqual({
      type: types.FETCH_EVENT_INVENTORY,
      payload: 1
    });
  });

  it('should create an action to reset the eventInventoryState', () => {
    const action = actions.resetEventInventory();
    expect(action).toEqual({
      type: types.RESET
    });
  });

  it('should create an action to set the current table filter', () => {
    const action = actions.setEventInventoryFilter('price');
    expect(action).toEqual({
      type: types.SET_EVENT_INVENTORY_FILTER,
      payload: 'price'
    });
  });

  it('should create an action to request an update the listed status of a row', () => {
    const action = actions.setEventRowListed({ id: 1, isListed: false }, true);
    expect(action).toEqual({
      type: types.SET_EVENT_ROW_LISTED_REQUEST,
      payload: {
        row: { id: 1, isListed: false },
        value: true
      }
    });
  });

  it('should create an action to update a property of the edited row', () => {
    const action = actions.updateEditedRowProperty(
      { id: 1, propertyName: 'overridePrice', propertyValue: null },
      true
    );
    expect(action).toEqual({
      type: types.UPDATE_EDITED_ROW_PROPERTY,
      payload: { id: 1, propertyName: 'overridePrice', propertyValue: null }
    });
  });

  it('should create an action to select an event row', () => {
    const action = actions.selectEventRow(1);
    expect(action).toEqual({
      type: types.SELECT_EVENT_ROW,
      payload: 1
    });
  });

  it('should create an action to select all event rows', () => {
    const action = actions.selectAllEventRows();
    expect(action).toEqual({
      type: types.SELECT_ALL_EVENT_ROWS
    });
  });

  it('should create an action to start editing a row', () => {
    const action = actions.startEditingRow(1);
    expect(action).toEqual({
      type: types.START_EDITING_ROW,
      payload: 1
    });
  });

  it('should create an action to cancel editing a row', () => {
    const action = actions.cancelEditingRow();
    expect(action).toEqual({
      type: types.CANCEL_EDITING_ROW
    });
  });

  it('should create an action to set scale filters', () => {
    const action = actions.setScaleFilters([1, 2, 3]);
    expect(action).toEqual({
      type: types.SET_SCALE_FILTERS,
      payload: [1, 2, 3]
    });
  });

  it('should create an action to clear all scale filters', () => {
    const action = actions.clearSelectedScaleFilters();
    expect(action).toEqual({
      type: types.CLEAR_SELECTED_SCALE_FILTERS
    });
  });

  it('should create an action to set selected scale filters', () => {
    const action = actions.setSelectedScaleFilters([1, 2, 3]);
    expect(action).toEqual({
      type: types.SET_SELECTED_SCALE_FILTERS,
      payload: [1, 2, 3]
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_EVENT_INVENTORY actions', () => {
    const prevState = { ...initialState };

    const action = { type: types.FETCH_EVENT_INVENTORY, payload: 1 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_EVENT_INVENTORY_SUCCESS actions', () => {
    const prevState = { ...initialState };

    const action = {
      type: types.FETCH_EVENT_INVENTORY_SUCCESS,
      payload: [1, 2, 3]
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      allRows: [1, 2, 3]
    });
  });

  it('should handle FETCH_EVENT_INVENTORY_ERROR actions', () => {
    const prevState = { ...initialState };

    const action = {
      type: types.FETCH_EVENT_INVENTORY_ERROR,
      payload: 'Some API Error'
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Some API Error'
    });
  });

  it('should handle SET_EVENT_INVENTORY_FILTER actions', () => {
    const prevState = { ...initialState };
    const action = actions.setEventInventoryFilter('Some Filter');
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      filterDirection: 'asc',
      filterName: 'Some Filter'
    });
  });

  it('should set filter direction to descending when SET_INVENTORY_FILTER is called twice', () => {
    const prevState = {
      ...initialState,
      filterName: 'Some Filter',
      filterDirection: 'asc'
    };
    const action = actions.setEventInventoryFilter('Some Filter');
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      filterDirection: 'desc'
    });
  });

  it('should handle SELECT_EVENT_ROW actions', () => {
    const prevState = { ...initialState };
    const action = actions.selectEventRow(10);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      selectedRowIds: [10]
    });
  });

  it('should remove a selected index when SELECT_EVENT_ROW is dispatched for an existing index', () => {
    const prevState = { ...initialState, selectedRowIds: [0, 1, 2] };
    const action = actions.selectEventRow(1);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      selectedRowIds: [0, 2]
    });
  });

  it('should handle SELECT_ALL_EVENT_ROW actions', () => {
    const prevState = {
      ...initialState,
      allRows: [{ id: 0 }, { id: 1 }, { id: 2 }],
      selectedRowIds: []
    };
    const action = actions.selectAllEventRows();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      selectedRowIds: [0, 1, 2]
    });
  });

  it('should unselect all event rows if SELECT_ALL_EVENT_ROWS is called with all rows already selected', () => {
    const prevState = {
      ...initialState,
      allRows: [{ id: 0 }, { id: 1 }, { id: 2 }],
      selectedRowIds: [0, 1, 2]
    };
    const action = actions.selectAllEventRows();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      selectedRowIds: []
    });
  });

  it('should handle SET_EVENT_ROW_LISTED_SUCCESS actions', () => {
    const prevState = {
      ...initialState,
      allRows: [{ id: 10, isListed: false }]
    };
    const action = {
      type: types.SET_EVENT_ROW_LISTED_REQUEST,
      payload: { row: { id: 10, isListed: false }, value: true }
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      allRows: [{ id: 10, isListed: true }]
    });
  });

  it('should handle START_EDITING_ROW actions', () => {
    const prevState = {
      ...initialState,
      editedRowId: null
    };
    const action = actions.startEditingRow(1);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      editedRowId: 1
    });
  });

  it('should handle CANCEL_EDITING_ROW actions', () => {
    const prevState = {
      ...initialState,
      editedRowId: 1
    };
    const action = actions.cancelEditingRow();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      editedRowId: null
    });
  });

  it('should handle UPDATE_EDITED_ROW_PROPERTY actions', () => {
    const prevState = {
      ...initialState,
      editedRowState: {}
    };
    const action = actions.updateEditedRowProperty(
      { id: 10, propertyName: 'overridePrice', propertyValue: 100 },
      100
    );
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      editedRowState: { overridePrice: 100 }
    });
  });

  it('should handle SET_SCALE_FILTERS actions', () => {
    const prevState = { ...initialState };
    const action = { type: types.SET_SCALE_FILTERS, payload: [1, 2, 3] };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      scaleFilters: [1, 2, 3],
      selectedScaleFilters: []
    });
  });

  it('should handle CLEAR_SELECTED_SCALE_FILTERS actions', () => {
    const prevState = {
      ...initialState,
      selectedScaleFilters: [1, 2],
      scaleFilters: [1, 2, 3]
    };
    const action = actions.clearSelectedScaleFilters();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      scaleFilters: [1, 2, 3],
      selectedScaleFilters: []
    });
  });

  it('should handle SET_SELECTED_SCALE_FILTERS actions', () => {
    const prevState = { ...initialState };
    const action = actions.setSelectedScaleFilters([1, 2, 3]);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      selectedScaleFilters: [1, 2, 3]
    });
  });

  it('should handle RESET actions', () => {
    const prevState = { ...initialState };

    const action = {
      type: types.RESET
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });
});

describe('Selectors', () => {
  it('selectAllEventInventoryRows should return the allRows state', () => {
    const state = {
      eventInventory: {
        allRows: [1, 2, 3]
      }
    };

    expect(selectors.selectAllEventInventoryRows(state)).toEqual([1, 2, 3]);
  });

  it('selectEventInventoryRows should return the rows state', () => {
    const state = {
      eventInventory: {
        ...initialState,
        allRows: [1, 2, 3]
      }
    };

    expect(selectors.selectEventInventoryRows(state)).toEqual([1, 2, 3]);
  });

  it('selectEventInventoryLoading should return the loading state', () => {
    const state = {
      eventInventory: {
        loading: true
      }
    };

    expect(selectors.selectEventInventoryLoading(state)).toEqual(true);
  });

  it('selectEventInventoryError should return the error state', () => {
    const state = {
      eventInventory: {
        error: 'Some API Error'
      }
    };

    expect(selectors.selectEventInventoryError(state)).toEqual(
      'Some API Error'
    );
  });

  it('selectEventInventoryFilter should return the current filter name and direction', () => {
    const state = {
      eventInventory: {
        filterName: 'Some Filter',
        filterDirection: 'desc'
      }
    };

    expect(selectors.selectEventInventoryFilter(state)).toEqual({
      name: 'Some Filter',
      direction: 'desc'
    });
  });

  it('selectScaleFilters should return the current scale filters', () => {
    const state = {
      eventInventory: {
        scaleFilters: [1, 2, 3]
      }
    };

    expect(selectors.selectScaleFilters(state)).toEqual([1, 2, 3]);
  });
});

describe('Saga workers', () => {
  it('fetchEventInventory should fetch events inventory', () => {
    const action = actions.fetchEventInventory(1);
    const generator = cloneableGenerator(fetchEventInventory)(action);

    expect(generator.next().value).toEqual(select(eventSelectors.selectEvent));

    expect(generator.next({ id: 1, venueId: 1 }).value).toEqual(
      all([
        call(eventService.getInventory, 1),
        call(venueService.getPriceScales, 1)
      ])
    );

    const fail = generator.clone();

    const error = new Error('API Error');
    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_EVENT_INVENTORY_ERROR, payload: error })
    );

    const eventInventory = [1, 2, 3];
    const priceScales = [{ id: 1, name: 'price scale 1' }];

    expect(generator.next([eventInventory, priceScales]).value).toEqual(
      call(mapSectionsToPriceScales, eventInventory)
    );

    expect(generator.next(eventInventory, priceScales).value).toEqual(
      put(actions.setSectionsToPriceScaleAction(eventInventory))
    );

    expect(generator.next([eventInventory, priceScales]).value).toEqual(
      put(actions.setScaleFilters(priceScales))
    );

    expect(generator.next([eventInventory, priceScales]).value).toEqual(
      call(findUniqueSections, eventInventory)
    );

    expect(generator.next(eventInventory, priceScales).value).toEqual(
      put(actions.setSectionFilters(eventInventory))
    );

    expect(generator.next([eventInventory, priceScales]).value).toEqual(
      put({
        type: types.FETCH_EVENT_INVENTORY_SUCCESS,
        payload: eventInventory
      })
    );
  });

  // it('setting manual price should set a rows listed status', () => {
  //   const row = { id: 1, seats: [1, 2, 3], section: 1, row: 1 };
  //   const action = actions.updateEditedRowProperty({
  //     id: row.id,
  //     propertyName: 'overridePrice',
  //     propertyValue: 10
  //   });
  //   const generator = cloneableGenerator(setOverridePrice)(action);

  //   const updateParams = {
  //     eventSeatIds: action.payload.row.seats,
  //     overridePrice: action.payload.value
  //   };

  //   expect(generator.next().value).toEqual(
  //     call(eventService.updateEventSeats, updateParams)
  //   );

  //   const fail = generator.clone();
  //   const error = new Error('API Error');

  //   expect(fail.throw(error).value).toEqual(
  //     put(
  //       alertActions.error(
  //         `Could not update section ${row.section} row ${row.row}.`
  //       )
  //     )
  //   );

  //   expect(fail.next().value).toEqual(
  //     put({
  //       type: types.SET,
  //       payload: { error, row }
  //     })
  //   );

  //   expect(generator.next().value).toEqual(
  //     put({
  //       type: types.SET_EVENT_ROW_MANUAL_PRICE_SUCCESS,
  //       payload: action.payload
  //     })
  //   );
  // });
});
