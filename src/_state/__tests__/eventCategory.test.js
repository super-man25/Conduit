import { eventCategoryService } from '_services';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchEventCategories } from '_state/eventCategory/saga';
import {
  selectors,
  actions,
  types,
  reducer,
  initialState
} from '_state/eventCategory';

describe('actions', () => {
  it('should create an action to fetch event categories', () => {
    const action = actions.fetchEventCategories();
    expect(action).toEqual({ type: types.FETCH_EVENT_CATEGORIES });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_EVENT_CATEGORIES', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: types.FETCH_EVENT_CATEGORIES };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_EVENT_CATEGORIES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const eventCategories = [{ name: 'Dugout Club' }];
    const action = {
      type: types.FETCH_EVENT_CATEGORIES_SUCCESS,
      payload: eventCategories
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      eventCategories
    });
  });

  it('should handle FETCH_EVENT_CATEGORIES_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = {
      type: types.FETCH_EVENT_CATEGORIES_ERROR,
      payload: 'An error'
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'An error'
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchEventCategories();
    const generator = cloneableGenerator(fetchEventCategories)(action);
    expect(generator.next().value).toEqual(call(eventCategoryService.getAll));

    const success = generator.clone();
    const eventCategories = [{ name: 'Dugout Club' }];

    expect(success.next(eventCategories).value).toEqual(
      put({
        type: types.FETCH_EVENT_CATEGORIES_SUCCESS,
        payload: eventCategories
      })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_EVENT_CATEGORIES_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('should select all event categories', () => {
    const store = {
      eventCategory: {
        ...initialState,
        eventCategories: [1, 2, 3]
      }
    };

    expect(selectors.selectAllEventCategories(store)).toEqual([1, 2, 3]);
  });
});
