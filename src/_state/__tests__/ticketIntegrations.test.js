import reducer, {
  types,
  selectors,
  actions,
  initialState,
} from '../ticketIntegrations';
import { fetchTicketIntegrations as fetchTicketIntegrationsSaga } from '../ticketIntegrations/saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { integrationStatService } from '_services';

describe('actions', () => {
  it('should create an action to fetch ticket integrations', () => {
    expect(actions.fetchTicketIntegrations()).toEqual({ type: types.FETCH });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH actions', () => {
    const prevState = {
      ticketIntegrations: [],
      loading: false,
      error: 'Possible Error',
    };

    const action = { type: types.FETCH };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ticketIntegrations: [],
      loading: true,
      error: null,
    });
  });

  it('should handle FETCH_SUCCESS actions', () => {
    const prevState = {
      ticketIntegrations: [],
      loading: true,
      error: null,
    };

    const action = {
      type: types.FETCH_SUCCESS,
      payload: [{ id: 1 }, { id: 2 }],
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ticketIntegrations: [{ id: 1 }, { id: 2 }],
      loading: false,
      error: null,
    });
  });

  it('should handle FETCH_ERROR actions', () => {
    const prevState = {
      loading: true,
      error: null,
    };

    const action = { type: types.FETCH_ERROR, payload: 'ERROR' };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      error: 'ERROR',
    });
  });
});

describe('selectors', () => {
  it('selectTicketIntegrations should return the current ticketIntegrations', () => {
    const store = {
      ticketIntegration: {
        ticketIntegrations: [1, 2, 3],
      },
    };

    expect(selectors.selectTicketIntegrations(store)).toEqual([1, 2, 3]);
  });

  it('selectTicketIntegrationsLoading should return the loading state for ticketIntegrations', () => {
    const store = {
      ticketIntegration: {
        loading: true,
        ticketIntegrations: [1, 2, 3],
      },
    };

    expect(selectors.selectTicketIntegrationsLoading(store)).toEqual(true);
  });

  it('selectTicketIntegrationsError should return the error state for ticketIntegrations', () => {
    const store = {
      ticketIntegration: {
        loading: true,
        ticketIntegrations: [1, 2, 3],
        error: 'Possible Error',
      },
    };

    expect(selectors.selectTicketIntegrationsError(store)).toEqual(
      'Possible Error'
    );
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchTicketIntegrations({ eventId: 1 });
    const generator = cloneableGenerator(fetchTicketIntegrationsSaga)(action);

    expect(generator.next().value).toEqual(
      call(integrationStatService.getAll, action.payload)
    );

    const mockPayload = [1, 2, 3];

    expect(generator.next(mockPayload).value).toEqual(
      put({ type: types.FETCH_SUCCESS, payload: mockPayload })
    );

    const fail = generator.clone();
    const error = new Error('Some api error');
    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_ERROR, payload: error })
    );
  });
});
