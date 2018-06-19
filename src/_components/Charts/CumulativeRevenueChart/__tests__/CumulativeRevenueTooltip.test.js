import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeRevenueTooltip } from '../CumulativeRevenueTooltip';
import { DATE_FORMATS } from '_constants';
import { mockDateFnsFormat } from '_helpers/test-utils';

jest.mock('date-fns', () => ({
  format: (date, format) => mockDateFnsFormat(date, format)
}));

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
  dateFormat: DATE_FORMATS.day
});

describe('<CumulativeRevenueTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeRevenueTooltip {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when active is false', () => {
    const props = { ...createProps(), active: false };
    const wrapper = shallow(<CumulativeRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no payload is passed', () => {
    const props = { ...createProps(), payload: [] };
    const wrapper = shallow(<CumulativeRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with different dateformats ', () => {
    const props = { ...createProps(), dateFormat: DATE_FORMATS.time };
    const wrapper = shallow(<CumulativeRevenueTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
