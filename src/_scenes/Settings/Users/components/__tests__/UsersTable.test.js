import React from 'react';
import { mount, shallow } from 'enzyme';
import { UsersTable } from '../UsersTable';

describe('<UsersTable />', () => {
  const props = {
    userList: [],
    fetchUserList: jest.fn(),
    reset: jest.fn(),
  };

  const propsWithUserList = {
    userList: [
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'bwayne@wayne.com',
        phoneNumber: '5555555555',
      },
    ],
    fetchUserList: jest.fn(),
    reset: jest.fn(),
  };

  it('renders correctly without a userList', () => {
    const wrapper = shallow(<UsersTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with a userList', () => {
    const wrapper = shallow(<UsersTable {...propsWithUserList} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls fetchUserList when mounted', () => {
    shallow(<UsersTable {...props} />);
    expect(props.fetchUserList).toHaveBeenCalled();
  });

  it('calls reset when component unmounts', () => {
    const wrapper = mount(<UsersTable {...props} />);
    wrapper.unmount();
    expect(props.reset).toHaveBeenCalled();
  });
});
