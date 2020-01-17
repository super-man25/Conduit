import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import { history } from '_helpers';

import { saga as appSaga } from './app';
import { reducer as alertReducer, saga as alertSaga } from './alert';
import { reducer as authReducer, saga as authSaga } from './auth';
import {
  reducer as buyerTypeReducer,
  saga as buyerTypeSaga,
} from './buyerType';
import { reducer as clientReducer, saga as clientSaga } from './client';
import {
  reducer as clientListReducer,
  saga as clientListSaga,
} from './clientList';
import { reducer as demoPriceReducer, saga as demoPriceSaga } from './demo';
import { reducer as eventReducer, saga as eventSaga } from './event';
import {
  reducer as eventCategoryReducer,
  saga as eventCategorySaga,
} from './eventCategory';
import {
  reducer as eventInventoryReducer,
  saga as eventInventorySaga,
} from './eventInventory';
import {
  reducer as eventInventoryBulkReducer,
  saga as eventInventoryBulkSaga,
} from './eventInventoryBulk';
import {
  reducer as eventListReducer,
  saga as eventListSaga,
} from './eventList';
import {
  reducer as eventScoreHistoryReducer,
  saga as eventScoreHistorySaga,
} from './eventScoreHistory';
import {
  reducer as eventStatReducer,
  saga as eventStatSaga,
} from './eventStat';
import { reducer as onboardReducer, saga as onboardSaga } from './onboard';
import {
  reducer as priceRuleReducer,
  saga as priceRuleSaga,
} from './priceRule';
import {
  reducer as priceScaleReducer,
  saga as priceScaleSaga,
} from './priceScale';
import {
  reducer as pricingPreviewReducer,
  saga as pricingPreviewSaga,
} from './pricingPreview';
import {
  reducer as revenueStatReducer,
  saga as revenueStatSaga,
} from './revenueStat';
import { reducer as seasonReducer, saga as seasonSaga } from './season';
import {
  reducer as seasonStatReducer,
  saga as seasonStatSaga,
} from './seasonStat';
import { reducer as seatMapReducer, saga as seatMapSaga } from './seatMap';
import { reducer as teamStatReducer, saga as teamStatSaga } from './teamStat';
import ticketIntegrationReducer, {
  saga as ticketIntegrationSaga,
} from './ticketIntegrations';
import { reducer as userReducer, saga as userSaga } from './user';
import { reducer as userListReducer, saga as userListSaga } from './userList';
import uiReducer from './ui';

export const reducers = {
  alert: alertReducer,
  auth: authReducer,
  buyerType: buyerTypeReducer,
  client: clientReducer,
  clientList: clientListReducer,
  demoPrice: demoPriceReducer,
  event: eventReducer,
  eventCategory: eventCategoryReducer,
  eventInventory: eventInventoryReducer,
  eventInventoryBulk: eventInventoryBulkReducer,
  eventList: eventListReducer,
  eventScoreHistory: eventScoreHistoryReducer,
  eventStat: eventStatReducer,
  onboard: onboardReducer,
  priceRule: priceRuleReducer,
  priceScale: priceScaleReducer,
  pricingPreview: pricingPreviewReducer,
  revenueStat: revenueStatReducer,
  season: seasonReducer,
  seasonStat: seasonStatReducer,
  seatMap: seatMapReducer,
  teamStat: teamStatReducer,
  ticketIntegration: ticketIntegrationReducer,
  user: userReducer,
  userList: userListReducer,
  ui: uiReducer,
};

// Build root reducer
const reducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});
const rootReducer = (state, action) => {
  if (action.type === 'global/RESET') {
    state = undefined;
  }
  return reducer(state, action);
};

// Setup enhancers
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

// Compose enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

const combineSagas = {
  alert: alertSaga,
  app: appSaga,
  auth: authSaga,
  buyerType: buyerTypeSaga,
  client: clientSaga,
  clientList: clientListSaga,
  demoPrice: demoPriceSaga,
  event: eventSaga,
  eventCategory: eventCategorySaga,
  eventInventory: eventInventorySaga,
  eventInventoryBulk: eventInventoryBulkSaga,
  eventList: eventListSaga,
  eventScoreHistory: eventScoreHistorySaga,
  eventStat: eventStatSaga,
  onboard: onboardSaga,
  priceRule: priceRuleSaga,
  priceScale: priceScaleSaga,
  pricingPreview: pricingPreviewSaga,
  revenueStat: revenueStatSaga,
  season: seasonSaga,
  seasonStat: seasonStatSaga,
  seatMap: seatMapSaga,
  teamStat: teamStatSaga,
  ticketIntegration: ticketIntegrationSaga,
  user: userSaga,
  userList: userListSaga,
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
