import { shallow } from 'enzyme';
import React from 'react';
import { TeamSettings } from '../index';

describe('<TeamSettings />', () => {
  const props = {
    clientActions: {
      fetch: jest.fn(),
      update: jest.fn(),
    },
    clientState: {
      id: 1,
      name: 'New York Mets',
      pricingInterval: 15,
    },
  };

  it('renders correctly', () => {
    const wrapper = shallow(<TeamSettings {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
