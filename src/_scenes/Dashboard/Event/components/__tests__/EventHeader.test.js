import React from 'react';
import { shallow } from 'enzyme';
import { EventHeader } from '../EventHeader';
import { mockDateFnsFormat } from '_helpers/test-utils';

jest.mock('date-fns', () => ({
  format: (date, format) => mockDateFnsFormat(date, format)
}));

const props = {
  event: {
    clientId: 1,
    createdAt: 1529336865706,
    id: 1,
    integrationId: 1,
    modifiedAt: 1529336865706,
    name: 'Some Event',
    seasonId: 1,
    timestamp: 1529336865706,
    venueId: 1
  },
  availableInventory: 100,
  totalInventory: 1000
};

describe('<EventHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<EventHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
