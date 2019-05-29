import { shallow } from 'enzyme';
import React from 'react';
import { ContactInfo } from '../containers/ContactInfoContainer';
import { SecondaryButton } from '_components';

describe('<ContactInfo />', () => {
  const props = {
    authState: {
      model: {
        id: 1,
        email: 'test@eventdynamic.com',
        createdAt: null,
        modifiedAt: null,
        firstName: 'First',
        lastName: 'Last',
        phoneNumber: '',
        clientId: 1
      }
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

  it('updates name', () => {
    const wrapper = shallow(<ContactInfo {...props} />);
    wrapper.setState({ editName: true });
    wrapper.find(SecondaryButton).simulate('click', { preventDefault() {} });
    expect(props.userActions.update).toBeCalled();
  });

  it('updates phone number', () => {
    const wrapper = shallow(<ContactInfo {...props} />);
    wrapper.setState({ editPhoneNumber: true });
    wrapper.find(SecondaryButton).simulate('click', { preventDefault() {} });
    expect(props.userActions.update).toBeCalled();
  });
});
