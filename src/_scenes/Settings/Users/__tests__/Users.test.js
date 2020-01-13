import React from 'react';
import { shallow } from 'enzyme';
import { UsersPresenter } from '../index';

describe('<Users />', () => {
  const props = {
    userList: [],
    fetchUserList: jest.fn(),
    reset: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<UsersPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
