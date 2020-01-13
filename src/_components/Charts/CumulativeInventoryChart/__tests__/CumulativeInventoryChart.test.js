import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeInventoryChart } from '../CumulativeInventoryChart';

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
      timestamp: 1529336865706,
    },
  ],
  dateFormatter: (d) => d.toString,
  renderNoData: () => <div />,
});

describe('<CumulativeInventoryChart />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeInventoryChart {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with no date', () => {
    const props = { ...createProps(), data: [] };
    const wrapper = shallow(<CumulativeInventoryChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a different height', () => {
    const props = { ...createProps(), height: 300 };
    const wrapper = shallow(<CumulativeInventoryChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
