import React from 'react';
import { shallow } from 'enzyme';
import { PeriodicRevenueChart } from '../PeriodicRevenueChart';
import { DATE_FORMATS } from '_constants';

const createProps = () => ({
  height: 400,
  data: [
    {
      eventId: 1,
      id: 1,
      inventory: 100,
      periodicInventory: 100,
      revenue: 100,
      periodicRevenue: 100,
      isProjected: false,
      timestamp: 1529336865706
    }
  ],
  dateFormat: DATE_FORMATS.day,
  renderNoData: () => <div />
});

describe('<PeriodicRevenueChart />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicRevenueChart {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with no date', () => {
    const props = { ...createProps(), data: [] };
    const wrapper = shallow(<PeriodicRevenueChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a different height', () => {
    const props = { ...createProps(), height: 300 };
    const wrapper = shallow(<PeriodicRevenueChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
