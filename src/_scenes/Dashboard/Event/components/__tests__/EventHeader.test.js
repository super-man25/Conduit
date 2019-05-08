import React from 'react';
import { shallow } from 'enzyme';
import { EventHeader } from '../EventHeader';
import { mockDateFnsFormat } from '_helpers/test-utils';

jest.mock('date-fns', () => ({
  format: (date, format) => mockDateFnsFormat(date, format)
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
    revenue: 739472
  },
  availableInventory: 100,
  totalInventory: 1000,
  pathname: '/event/1/'
});

describe('<EventHeader />', () => {
  it('should render correctly', () => {
    const props = createProps();
    const wrapper = shallow(<EventHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when on the location route', () => {
    const props = createProps();
    props.pathname = '/event/1/inventory';

    const wrapper = shallow(<EventHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
