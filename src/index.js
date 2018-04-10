import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import { store } from './_helpers';
import { App } from './App';
// import registerServiceWorker from './registerServiceWorker';   // until we have an https connection on the web...

import okIcon from './_images/valid.png';
import badIcon from './_images/invalid.png';

import { configureFakeBackend } from './_helpers';
configureFakeBackend();                                           // setup fake backend

// prevent text input backgrounds from becoming yellow @ hiding icons after autofill in Chrome
injectGlobal`
  @-webkit-keyframes autofillOK {
    to {
      color: #666;
      background: white;
      background-image: ${'url(' + okIcon + ')'};
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
  @-webkit-keyframes autofillBAD {
    to {
      color: #666;
      background: white;
      background-image: ${'url(' + badIcon + ')'};
      background-repeat: no-repeat;
      background-position: right center;
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
