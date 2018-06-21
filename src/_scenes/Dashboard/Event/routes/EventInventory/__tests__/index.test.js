import React from 'react';
import { shallow } from 'enzyme';
import { EventInventory } from '_scenes/Dashboard/Event/routes/EventInventory';

describe('<EventInventory /> index route', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<EventInventory event={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
