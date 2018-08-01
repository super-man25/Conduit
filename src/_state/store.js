import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { reducer as alertReducer, saga as alertSaga } from './alert';
import { reducer as authReducer, saga as authSaga } from './auth';
import { reducer as clientReducer, saga as clientSaga } from './client';
import {
  reducer as eventStatReducer,
  saga as eventStatSaga
} from './eventStat';
import { reducer as eventReducer, saga as eventSaga } from './event';
import { reducer as userReducer, saga as userSaga } from './user';
import { reducer as teamStatReducer, saga as teamStatSaga } from './teamStat';
import uiReducer from './ui';
import {
  reducer as seasonStatReducer,
  saga as seasonStatSaga
} from './seasonStat';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { history } from '_helpers';
import {
  reducer as revenueStatReducer,
  saga as revenueStatSaga
} from './revenueStat';
import ticketIntegrationReducer, {
  saga as ticketIntegrationSaga
} from './ticketIntegrations';
import { reducer as seasonReducer, saga as seasonSaga } from './season';
import {
  reducer as eventListReducer,
  saga as eventListSaga
} from './eventList';
import {
  reducer as eventInventoryReducer,
  saga as eventInventorySaga
} from './eventInventory';
import {
  reducer as eventInventoryBulkReducer,
  saga as eventInventoryBulkSaga
} from './eventInventoryBulk';
import { reducer as seatMapReducer, saga as seatMapSaga } from './seatMap';

export const reducers = {
  alert: alertReducer,
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
  client: clientReducer,
  seasonStat: seasonStatReducer,
  eventStat: eventStatReducer,
  teamStat: teamStatReducer,
  revenueStat: revenueStatReducer,
  ui: uiReducer,
  ticketIntegration: ticketIntegrationReducer,
  season: seasonReducer,
  eventList: eventListReducer,
  eventInventory: eventInventoryReducer,
  eventInventoryBulk: eventInventoryBulkReducer,
  seatMap: seatMapReducer
};

// Build root reducer
const reducer = combineReducers(reducers);

// Setup enhancers
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

// Create store
const store = createStore(
  connectRouter(history)(reducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
);

const combineSagas = {
  alert: alertSaga,
  auth: authSaga,
  event: eventSaga,
  user: userSaga,
  client: clientSaga,
  eventStat: eventStatSaga,
  teamStat: teamStatSaga,
  seasonStat: seasonStatSaga,
  revenueStat: revenueStatSaga,
  ticketIntegration: ticketIntegrationSaga,
  season: seasonSaga,
  eventList: eventListSaga,
  eventInventory: eventInventorySaga,
  eventInventoryBulk: eventInventoryBulkSaga,
  seatMap: seatMapSaga
};

export function* rootSaga() {
  yield all(
    Object.values(combineSagas).reduce((acc, saga) => {
      return acc.concat(Object.values(saga).map((fn) => fork(fn)));
    }, [])
  );
}

// Run Sagas
sagaMiddleware.run(rootSaga);

store.injectSaga = (saga) => {
  sagaMiddleware.run(saga);
};

export { store };
