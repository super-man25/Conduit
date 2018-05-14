import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { reducer as alertReducer } from './alert';
import { reducer as authReducer, saga as authSaga } from './auth';
import { reducer as clientReducer, saga as clientSaga } from './clients';
import {
  reducer as eventStatReducer,
  saga as eventStatSaga
} from './eventStats';
import { reducer as eventReducer, saga as eventSaga } from './events';
import { reducer as userReducer, saga as userSaga } from './users';
import {
  reducer as mlbTeamStatReducer,
  saga as mlbTeamStatSaga
} from './mlbTeamStat';

// Build root reducer
const reducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  event: eventReducer,
  user: userReducer,
  client: clientReducer,
  eventStats: eventStatReducer,
  mlbTeamStat: mlbTeamStatReducer
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
  mlbTeamStat: mlbTeamStatSaga
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
