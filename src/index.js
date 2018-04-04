import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { injectGlobal } from 'styled-components';

import { store } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// injectGlobal`
//   @font-face {
//     font-family: 'Roboto Regular';
//     src: url('../fonts/Operator-Mono.ttf');
//   }`;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
