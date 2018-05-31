import { shallow } from 'enzyme';
import React from 'react';
import { ContactInfo } from '../containers/ContactInfoContainer';

describe('<ContactInfo />', () => {
  const props = {
    authState: {
      model: {}
    },
    userActions: {
      changePassword: jest.fn(),
      update: jest.fn(),
      updateEmail: jest.fn()
    }
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ContactInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
