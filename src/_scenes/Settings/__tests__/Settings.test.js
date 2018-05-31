import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from '../index';

describe('<Settings />', () => {
  const props = {
    authState: { model: { id: 1, firstName: 'groot', lastName: 'groot' } },
    authActions: {}
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
