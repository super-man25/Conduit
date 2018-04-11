import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
// import registerServiceWorker from './registerServiceWorker';   // until we have an https connection on the web...

import { configureFakeBackend } from './_helpers';
configureFakeBackend();                                           // setup fake backend

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();   // commented out because it will not work until we have an https connection  
                              // in localhost, the requirement for a secure host is relaxed, for ease in development
