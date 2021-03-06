import React from 'react';
import { shallow } from 'enzyme';

import { PeriodicInventoryTooltip } from '../PeriodicInventoryTooltip';

const defaultProps = {
  active: true,
  payload: [
    {
      payload: {
        eventId: 1,
        id: 1,
        inventory: 100,
        soldInventory: 50,
        periodicInventory: 100,
        revenue: 100,
        periodicRevenue: 100,
        isProjected: false,
        timestamp: 1529336865706,
      },
    },
  ],
  dateFormatter: (d) => d.toString(),
};

describe('<PeriodicInventoryTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicInventoryTooltip {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when active is false', () => {
    const props = { ...defaultProps, active: false };
    const wrapper = shallow(<PeriodicInventoryTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no payload is passed', () => {
    const props = { ...defaultProps, payload: [] };
    const wrapper = shallow(<PeriodicInventoryTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
