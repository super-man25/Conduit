import React from 'react';
import { shallow } from 'enzyme';
import { EventChart } from '../EventChart';

const createProps = () => ({
  eventStatState: {
    loading: true,
    groupFilters: [],
    dateRange: { from: null, to: null },
    eventDateLimits: { from: null, to: null },
    selectedGroupFilter: null,
    eventStats: []
  },
  eventStatActions: {
    fetch: jest.fn(),
    setGroupFilter: jest.fn(),
    setDateRange: jest.fn(),
    clear: jest.fn()
  },
  activeEvent: { id: 1 },
  selectedSeason: { startTimestamp: null }
});

describe('<EventChart />', () => {
  it('should render correctly', () => {
    const props = createProps();
    const wrapper = shallow(<EventChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetch on componentDidMount', () => {
    const props = createProps();
    shallow(<EventChart {...props} />);
    expect(props.eventStatActions.fetch).toHaveBeenCalled();
  });

  it('should call fetch on componentDidUpdate if and only if the activeEventId changes', () => {
    const props = createProps();
    const wrapper = shallow(<EventChart {...props} />);

    const { eventStatState: updatedEventStatState } = createProps();
    updatedEventStatState.selectedGroupFilter = 1;

    wrapper.setProps(updatedEventStatState);

    expect(props.eventStatActions.fetch).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      activeEvent: { id: 2 }
    });

    expect(props.eventStatActions.fetch).toHaveBeenCalledTimes(2);
  });
});
