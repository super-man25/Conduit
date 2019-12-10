import React from 'react';
import { shallow } from 'enzyme';
import { Onboard } from '../index';

describe('<Onboard />', () => {
  const props = {
    onboardActions: {}
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Onboard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
