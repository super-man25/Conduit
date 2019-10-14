import React from 'react';
import { shallow } from 'enzyme';
import { PeriodicInventoryTooltip } from '../PeriodicInventoryTooltip';
import { READABLE_DATETIME_FORMAT } from '_constants';
import { dateFormatter } from '_helpers';

const createProps = () => ({
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
        timestamp: 1529336865706
      }
    }
  ],
  dateFormatter: (d) => d.toString
});

describe('<PeriodicInventoryTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicInventoryTooltip {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when active is false', () => {
    const props = { ...createProps(), active: false };
    const wrapper = shallow(<PeriodicInventoryTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no payload is passed', () => {
    const props = { ...createProps(), payload: [] };
    const wrapper = shallow(<PeriodicInventoryTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with different dateformats ', () => {
    const props = {
      ...createProps(),
      dateFormatter: dateFormatter(READABLE_DATETIME_FORMAT, 'America/New_York')
    };
    const wrapper = shallow(<PeriodicInventoryTooltip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
