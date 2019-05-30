import { actions, types, reducer, initialState, selectors } from '../seatMap';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchSeatMap, fetchImageAndCreateObjectUrl } from '../seatMap/saga';
import { select, all, call, put } from 'redux-saga/effects';
import { selectors as eventSelectors } from '../event';
import { venueService } from '_services';

describe('actions', () => {
  it('should create an action to request the seatMap', () => {
    const action = actions.fetchSeatMap();
    expect(action).toEqual({
      type: types.FETCH_SEAT_MAP_REQUEST
    });
  });

  it('should create an action to handle fetchSeatMap success', () => {
    const action = actions.fetchSeatMapSuccess({
      mapping: [1, 2, 3],
      venue: { id: 1 },
      objUrl: 'url'
    });
    expect(action).toEqual({
      type: types.FETCH_SEAT_MAP_SUCCESS,
      payload: {
        mapping: [1, 2, 3],
        venue: { id: 1 },
        objUrl: 'url'
      }
    });
  });

  it('should create an action to handle fetchSeatMap errors', () => {
    const action = actions.fetchSeatMapError('Some Api Error');
    expect(action).toEqual({
      type: types.FETCH_SEAT_MAP_ERROR,
      payload: 'Some Api Error'
    });
  });

  it('should create an action to reset to the initial state', () => {
    const action = actions.resetSeatMap();
    expect(action).toEqual({
      type: types.RESET
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_SEAT_MAP_REQUEST actions', () => {
    const prevState = { ...initialState };
    const action = actions.fetchSeatMap();

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true,
      error: null
    });
  });

  it('should handle FETCH_SEAT_MAP_SUCCESS actions', () => {
    const prevState = { ...initialState, loading: true };
    const action = actions.fetchSeatMapSuccess({
      mapping: [1, 2, 3],
      venue: { id: 1 },
      objUrl: 'url'
    });

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      mapping: [1, 2, 3],
      venue: { id: 1 },
      objUrl: 'url'
    });
  });

  it('should handle FETCH_SEAT_MAP_ERROR actions', () => {
    const prevState = { ...initialState, loading: true };
    const action = actions.fetchSeatMapError('Some API Error');

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Some API Error'
    });
  });

  it('should handle RESET actions', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: 'some error',
      mapping: [1, 2, 3],
      venue: { id: 1 },
      objUrl: 'url'
    };
    const action = actions.resetSeatMap();

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });
});

describe('selectors', () => {
  const state = {
    seatMap: {
      ...initialState,
      loading: true,
      objUrl: 'url',
      mapping: [1, 2, 3],
      error: 'Some Error',
      venue: { id: 1 }
    }
  };

  it('selectLoading should select the loading state', () => {
    expect(selectors.selectLoading(state)).toEqual(true);
  });

  it('selectError should select the error state', () => {
    expect(selectors.selectError(state)).toEqual('Some Error');
  });

  it('selectMapping should select the seat mapping', () => {
    expect(selectors.selectMapping(state)).toEqual([1, 2, 3]);
  });

  it('selectVenue should select the venue', () => {
    expect(selectors.selectVenue(state)).toEqual({ id: 1 });
  });

  it('selectVenueMapBlob should select the objUrl for the venue', () => {
    expect(selectors.selectVenueMapBlob(state)).toEqual('url');
  });
});

describe('saga workers', () => {
  it('should handle fetchSeatMap', () => {
    const action = actions.fetchSeatMap();
    const generator = cloneableGenerator(fetchSeatMap)(action);

    expect(generator.next().value).toEqual(select(eventSelectors.selectEvent));

    expect(generator.next({ venueId: 1 }).value).toEqual(
      call(venueService.getOne, 1)
    );

    const failPath = generator.clone();
    const error = new Error('Some API Error');
    expect(failPath.throw(error).value).toEqual(
      put(actions.fetchSeatMapError(error))
    );

    expect(failPath.next().done).toEqual(true);

    expect(generator.next([{ id: 1, svgUrl: 'url' }]).value).toEqual(
      call(fetchImageAndCreateObjectUrl, 'url')
    );

    expect(generator.next('blob:url').value).toEqual(
      put(
        actions.fetchSeatMapSuccess({
          venue: { id: 1, svgUrl: 'url' },
          objUrl: 'blob:url'
        })
      )
    );

    expect(generator.next().done).toEqual(true);
  });
});
