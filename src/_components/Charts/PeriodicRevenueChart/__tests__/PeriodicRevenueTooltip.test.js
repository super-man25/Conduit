import { shallow } from 'enzyme';
import React from 'react';
import { READABLE_DATETIME_FORMAT } from '_constants';
import { dateFormatter } from '_helpers';
import { PeriodicRevenueTooltip } from '../PeriodicRevenueTooltip';

const createProps = () => ({
  active: true,
  payload: [
    {
      payload: {
        eventId: 1,
        id: 1,
        inventory: 100,
        periodicInventory: 100,
        revenue: 100,
        periodicRevenue: 100,
        isProjected: false,
        timestamp: 1529336865706
      }
    }
  ],
  dateFormatter: (d) => d.toString()
});

describe('<PeriodicRevenueTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicRevenueTooltip {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when active is false', () => {
    const props = { ...createProps(), active: false };
    const wrapper = shallow(<PeriodicRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no payload is passed', () => {
    const props = { ...createProps(), payload: [] };
    const wrapper = shallow(<PeriodicRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with different dateformats ', () => {
    const props = {
      ...createProps(),
      dateFormatter: dateFormatter(READABLE_DATETIME_FORMAT, 'America/New_York')
    };
    const wrapper = shallow(<PeriodicRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
