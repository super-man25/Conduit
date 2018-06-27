import React from 'react';
import { shallow } from 'enzyme';
import { SeasonRevenuePanel } from '../SeasonRevenuePanel';

describe('<SeasonRevenuePanel />', () => {
  const props = {
    seasonStatState: {
      loading: true,
      groupFilters: [],
      dateRange: { from: null, to: null },
      eventDateLimits: { from: null, to: null },
      selectedGroupFilter: null,
      seasonStats: []
    },
    seasonStatActions: {
      fetch: jest.fn(),
      setGroupFilter: jest.fn(),
      setDateRange: jest.fn()
    }
  };

  it('should render correctly', () => {
    const wrapper = shallow(<SeasonRevenuePanel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetch on componentDidMount', () => {
    shallow(<SeasonRevenuePanel {...props} />);
    expect(props.seasonStatActions.fetch).toHaveBeenCalled();
  });
});
