import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as alertReducer } from './alert';
import { reducer as authReducer, saga as authSaga } from './auth';
import { reducer as eventsReducer, saga as eventsSaga } from './events';
import { reducer as usersReducer, saga as usersSaga } from './users';
import { reducer as clientsReducer, saga as clientsSaga } from './clients';

// Build root reducer
const reducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  events: eventsReducer,
  users: usersReducer,
  clients: clientsReducer
});

// Setup enhancers
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    sagaMiddleware
  )
);

// Run Sagas
sagaMiddleware.run(authSaga);
sagaMiddleware.run(eventsSaga);
sagaMiddleware.run(usersSaga);
sagaMiddleware.run(clientsSaga);

export {
  store
};
