import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './state/store';
import '../node_modules/react-vis/dist/style.css';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();   // commented out because it will not work until we have an https connection
// in localhost, the requirement for a secure host is relaxed, for ease in development
