import React from 'react';
import { shallow } from 'enzyme';
import { RevenueBreakdown } from '../RevenueBreakdown';

describe('<RevenueBreakdown />', () => {
  const generateProps = () => ({
    revenueStatState: {
      loading: false,
      ticketBreakdown: [
        {
          id: 1,
          name: 'Single Game',
          revenue: 1000,
          inventory: 10000,
        },
        {
          id: 2,
          name: 'Group Tickets',
          revenue: 1000,
          inventory: 5000,
        },
        {
          id: 3,
          name: 'Single Suites',
          revenue: 1000,
          inventory: 7000,
        },
      ],
    },
    revenueStatActions: {
      fetch: jest.fn(),
      reset: jest.fn(),
    },
    type: 'revenue',
  });

  it('should call fetch on componentDidMount', () => {
    const props = generateProps();
    shallow(<RevenueBreakdown {...props} />);

    expect(props.revenueStatActions.fetch).toHaveBeenCalled();
  });

  it('should render the loading state correctly', () => {
    const props = generateProps();
    props.revenueStatState.loading = true;

    const wrapper = shallow(<RevenueBreakdown {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with revenue data', () => {
    const props = generateProps();

    const wrapper = shallow(<RevenueBreakdown {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with revenue data', () => {
    const props = generateProps();
    props.type = 'inventory';

    const wrapper = shallow(<RevenueBreakdown {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
