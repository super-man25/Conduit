import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';

import renderer from 'react-test-renderer';
// import configureStore from 'redux-mock-store';
// import localStorageTest from '../setupTests';

// import { OuterWrapper, SiteHeader, ContentWrapper, LeftNav, MainContent, Breadcrumbs, ScreenTitleBlock, H3 } from '../_components';
// import ContactInfoSettings from './ContactInfoSettings';
// import NotificationSettings from './NotificationSettings';
// import TeamSettings from './TeamSettings';
import { SettingsPageTest } from './SettingsPage';

// const testUser = { id: 1, firstName: 'John', lastName: 'Smith' };
// const testStore = {
//   getState: jest.fn(() => ({})),
//   dispatch: jest.fn()
// };

// create any initial state needed
// const initialState = {
//   user: testUser
// };
// here it is possible to pass in any middleware if needed into //configureStore
// const mockStore = configureStore();
// let wrapper;
// let store;

beforeEach(() => {
  // creates the store with any initial state or middleware needed
  // store = mockStore(initialState);
  // wrapper = shallow(<Login store={store}/>)
});

xit('renders correctly with no props', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store>
          <SettingsPageTest />
        </Provider>
      </MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
