import React from 'react';
import { shallow } from 'enzyme';
import { Event } from '_scenes/Dashboard/Event';

describe('<Event /> index route', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Event event={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
