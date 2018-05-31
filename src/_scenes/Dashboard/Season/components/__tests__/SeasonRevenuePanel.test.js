import React from 'react';
import { shallow } from 'enzyme';
import { SeasonRevenuePanel } from '../SeasonRevenuePanel';

describe('<SeasonRevenuePanel />', () => {
  const props = {
    eventStatState: {
      loading: true,
      groupFilters: [],
      dateRange: { from: null, to: null },
      eventDateLimits: { from: null, to: null },
      selectedGroupFilter: null
    },
    eventStatsSelectors: {
      model: []
    },
    eventStatActions: {
      fetch: jest.fn(),
      setGroupFilter: jest.fn(),
      setDateRange: jest.fn()
    }
  };

  it('should render correctly', () => {
    const wrapper = shallow(<SeasonRevenuePanel {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(props.eventStatActions.fetch).toHaveBeenCalled();
  });
});
