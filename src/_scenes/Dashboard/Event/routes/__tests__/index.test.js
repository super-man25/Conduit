import React from 'react';
import { shallow } from 'enzyme';
import { EventRoute } from '_scenes/Dashboard/Event';

const createProps = () => ({
  match: { params: { id: 1 } },
  replace: jest.fn(),
  fetchEvent: jest.fn(),
  eventState: { event: { id: 1 }, loading: false, error: null }
});

describe('<Event /> index route', () => {
  it('should render correctly', () => {
    const props = createProps();
    const wrapper = shallow(<EventRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when loading is true', () => {
    const props = createProps();
    props.eventState.loading = true;
    const wrapper = shallow(<EventRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should replace the current route with the season route when there is an error fetching an event', () => {
    const props = createProps();
    props.eventState.error = 'Some Error';
    shallow(<EventRoute {...props} />);

    expect(props.replace).toBeCalled();
  });

  it('should fetch an event on mount', () => {
    const props = createProps();
    shallow(<EventRoute {...props} />);

    expect(props.fetchEvent).toBeCalled();
  });

  it('should fetch a new event when the event is updated', () => {
    const props = createProps();
    const wrapper = shallow(<EventRoute {...props} />);

    expect(props.fetchEvent).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      match: { params: { id: 2 } }
    });

    expect(props.fetchEvent).toHaveBeenCalledTimes(2);
  });
});
