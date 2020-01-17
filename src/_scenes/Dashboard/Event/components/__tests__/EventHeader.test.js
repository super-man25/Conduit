import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { EventHeader } from '../EventHeader';
import { mockDateFnsFormat, mockIsAfter } from '_helpers/test-utils';

jest.mock('date-fns', () => ({
  format: (date, format) => mockDateFnsFormat(date, format),
  isAfter: (timestamp, today) => mockIsAfter(timestamp, today),
}));

const createProps = () => ({
  event: {
    clientId: 1,
    createdAt: 1529336865706,
    id: 1,
    integrationId: 1,
    modifiedAt: 1529336865706,
    name: 'Some Event',
    seasonId: 1,
    timestamp: 1529336865706,
    venueId: 1,
    revenue: 739472,
    timeZone: 'America/Chicago',
  },
  availableInventory: 100,
  totalInventory: 1000,
  pathname: '/event/1/',
});

describe('<EventHeader />', () => {
  const initialState = {
    sidebarIsOpen: true,
  };
  const mockStore = configureStore();
  it('should render correctly', () => {
    const store = mockStore(initialState);
    const props = createProps();
    const wrapper = shallow(
      <Provider store={store}>
        <EventHeader {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when on the location route', () => {
    const store = mockStore(initialState);
    const props = createProps();
    props.pathname = '/event/1/inventory';

    const wrapper = shallow(
      <Provider store={store}>
        <EventHeader {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
