import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { EventInventory } from '../';
import { initialState } from '_state/eventInventory';

describe('<EventInventory /> index route', () => {
  const props = {
    event: {},
    selectedEventIds: [],
    isBulkUpdating: false,
    startBulkUpdate: jest.fn(),
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <EventInventory {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when there are selectedEventIds', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <EventInventory {...props} selectedEventIds={[1, 2, 3]} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when there are selectedEventIds and isBulkUpdating is true', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <EventInventory
          {...props}
          selectedEventIds={[1, 2, 3]}
          isBulkUpdating={true}
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
