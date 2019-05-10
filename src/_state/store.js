import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
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
import { reducer as userListReducer, saga as userListSaga } from './userList';
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
  reducer as eventCategoryReducer,
  saga as eventCategorySaga
} from './eventCategory';
import {
  reducer as buyerTypeReducer,
  saga as buyerTypeSaga
} from './buyerType';
import {
  reducer as priceRuleReducer,
  saga as priceRuleSaga
} from './priceRule';
import {
  reducer as priceScaleReducer,
  saga as priceScaleSaga
} from './priceScale';
import {
  reducer as eventInventoryBulkReducer,
  saga as eventInventoryBulkSaga
} from './eventInventoryBulk';
import { reducer as seatMapReducer, saga as seatMapSaga } from './seatMap';
import { reducer as demoPriceReducer, saga as demoPriceSaga } from './demo';
import {
  reducer as pricingPreviewReducer,
  saga as pricingPreviewSaga
} from './pricingPreview';

export const reducers = {
  alert: alertReducer,
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
  userList: userListReducer,
  client: clientReducer,
  seasonStat: seasonStatReducer,
  eventStat: eventStatReducer,
  teamStat: teamStatReducer,
  revenueStat: revenueStatReducer,
  ui: uiReducer,
  ticketIntegration: ticketIntegrationReducer,
  season: seasonReducer,
  eventList: eventListReducer,
  buyerType: buyerTypeReducer,
  priceRule: priceRuleReducer,
  priceScale: priceScaleReducer,
  eventInventory: eventInventoryReducer,
  eventInventoryBulk: eventInventoryBulkReducer,
  eventCategory: eventCategoryReducer,
  seatMap: seatMapReducer,
  demoPrice: demoPriceReducer,
  pricingPreview: pricingPreviewReducer
};

// Build root reducer
const reducer = combineReducers({
  router: connectRouter(history),
  ...reducers
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
  auth: authSaga,
  event: eventSaga,
  user: userSaga,
  userList: userListSaga,
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
  eventCategory: eventCategorySaga,
  buyerType: buyerTypeSaga,
  priceRule: priceRuleSaga,
  priceScale: priceScaleSaga,
  seatMap: seatMapSaga,
  demoPrice: demoPriceSaga,
  pricingPreview: pricingPreviewSaga
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
