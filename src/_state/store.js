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

// Build root reducer
const reducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
  client: clientReducer,
  eventStat: eventStatReducer,
  teamStat: teamStatReducer,
  ui: uiReducer
});

// Setup enhancers
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

const combineSagas = {
  auth: authSaga,
  event: eventSaga,
  user: userSaga,
  client: clientSaga,
  eventStat: eventStatSaga,
  teamStat: teamStatSaga
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