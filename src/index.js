import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '_state/store';

import App from './App';
import { actions } from '_state/ui';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

document.addEventListener('keydown', (e) => {
  if (e.key === '[') {
    store.dispatch(actions.toggleSidebar());
  }
});
// registerServiceWorker();   // commented out because it will not work until we have an https connection
// in localhost, the requirement for a secure host is relaxed, for ease in development
