import React from 'react';
import { shallow } from 'enzyme';
import { EventOverview } from '_scenes/Dashboard/Event/routes/EventOverview';

describe('<EventOverview /> index route', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<EventOverview event={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
