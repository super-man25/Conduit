import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import { store } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// prevent text input backgrounds from becoming yellow after autofill in Chrome
injectGlobal`
  @-webkit-keyframes autofill {
    to {
      color: #666;
      background: transparent;
    }
  }
}`;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();   // commented out because it will not work until we have an https connection  
                              // in localhost, the requirement for a secure host is relaxed, for ease in development
