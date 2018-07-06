import { actions, types, reducer, initialState, selectors } from '../season';
import { cloneableGenerator } from 'redux-saga/utils';
import { fetchSeasons } from '../season/saga';
import { call, select, put } from 'redux-saga/effects';
import { seasonService } from '_services';

describe('actions', () => {
  it('should create an action to fetch seasons', () => {
    const action = actions.fetchSeasons();
    expect(action).toEqual({ type: types.FETCH });
  });

  it('should create an action to set the active seasonsId', () => {
    const action = actions.setActiveId(1);
    expect(action).toEqual({ type: types.SET_ACTIVE, payload: 1 });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH actions', () => {
    const prevState = {
      seasons: [],
      activeId: -1,
      loading: false,
      error: null
    };

    const action = { type: types.FETCH };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      seasons: [],
      activeId: -1,
      loading: true,
      error: null
    });
  });

  it('should handle FETCH_SUCCESS actions', () => {
    const prevState = {
      seasons: [],
      activeId: -1,
      loading: true,
      error: null
    };

    const seasons = [{ id: 1, name: 'Season 1' }, { id: 2, name: 'Season 2' }];

    const action = { type: types.FETCH_SUCCESS, payload: seasons };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      seasons,
      activeId: -1,
      loading: false,
      error: null
    });
  });

  it('should handle FETCH_ERROR actions', () => {
    const prevState = {
      seasons: [],
      activeId: -1,
      loading: true,
      error: null
    };

    const error = 'Some Error';

    const action = { type: types.FETCH_ERROR, payload: error };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      seasons: [],
      activeId: -1,
      loading: false,
      error
    });
  });

  it('should handle SET_ACTIVE actions', () => {
    const prevState = {
      seasons: [],
      activeId: -1,
      loading: false,
      error: null
    };

    const action = { type: types.SET_ACTIVE, payload: 1 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      seasons: [],
      activeId: 1,
      loading: false,
      error: null
    });
  });

  it('should handle RESET actions', () => {
    const prevState = {
      seasons: [1, 2, 3],
      activeId: 2,
      loading: true,
      error: 'Some error'
    };

    const action = { type: types.RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });
});

describe('selectors', () => {
  const store = {
    season: {
      seasons: [{ id: 1, name: 'Season 1' }, { id: 2, name: 'Season 2' }],
      activeId: 2,
      loading: true,
      error: 'Some error'
    }
  };

  it('selectSeasons selector should select all seasons', () => {
    expect(selectors.selectSeasons(store)).toEqual([
      { id: 1, name: 'Season 1' },
      { id: 2, name: 'Season 2' }
    ]);
  });

  it('selectLoading should return the loading state', () => {
    expect(selectors.selectLoading(store)).toEqual(true);
  });

  it('selectError should return the error state', () => {
    expect(selectors.selectError(store)).toEqual('Some error');
  });

  it('selectActiveSeasonId should return the activeId', () => {
    expect(selectors.selectActiveSeasonId(store)).toEqual(2);
  });

  it('selectActiveSeason should return the active season', () => {
    expect(selectors.selectActiveSeason(store)).toEqual({
      id: 2,
      name: 'Season 2'
    });
  });
});

describe('saga workers', () => {
  it('fetchSeason worker', () => {
    const action = actions.fetchSeasons();
    const generator = cloneableGenerator(fetchSeasons)(action);

    expect(generator.next().value).toEqual(call(seasonService.getAll));

    const errorGenerator = generator.clone();

    expect(errorGenerator.throw('Some error').value).toEqual(
      put({ type: types.FETCH_ERROR, payload: 'Some error' })
    );

    const seasons = [{ id: 1 }, { id: 2 }];
    expect(generator.next(seasons).value).toEqual(
      put({ type: types.FETCH_SUCCESS, payload: seasons })
    );

    expect(generator.next().value).toEqual(
      select(selectors.selectActiveSeasonId)
    );

    const hasActiveSeasonGenerator = generator.clone();
    const noActiveSeasonGenerator = generator.clone();

    expect(hasActiveSeasonGenerator.next(1).done).toEqual(true);

    expect(noActiveSeasonGenerator.next(-1).value).toEqual(
      put({ type: types.SET_ACTIVE, payload: 1 })
    );

    expect(noActiveSeasonGenerator.next().done).toEqual(true);
  });
});
