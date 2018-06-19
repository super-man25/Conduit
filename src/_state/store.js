import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { reducer as alertReducer } from './alert';
import { reducer as authReducer, saga as authSaga } from './auth';
import { reducer as clientReducer, saga as clientSaga } from './client';
import {
  reducer as eventStatReducer,
  saga as eventStatSaga
} from './eventStat';
import { reducer as eventReducer, saga as eventSaga } from './event';
import { reducer as userReducer, saga as userSaga } from './user';
import { reducer as teamStatReducer, saga as teamStatSaga } from './teamStat';
import { reducer as uiReducer } from './ui';
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

// Build root reducer
const reducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
  client: clientReducer,
  seasonStat: seasonStatReducer,
  eventStat: eventStatReducer,
  teamStat: teamStatReducer,
  revenueStat: revenueStatReducer,
  ui: uiReducer
});

// Setup enhancers
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = createStore(
  connectRouter(history)(reducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const combineSagas = {
  auth: authSaga,
  event: eventSaga,
  user: userSaga,
  client: clientSaga,
  eventStat: eventStatSaga,
  teamStat: teamStatSaga,
  seasonStat: seasonStatSaga,
  revenueStat: revenueStatSaga
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

export { store };
