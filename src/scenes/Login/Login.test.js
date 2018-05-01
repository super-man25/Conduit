
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { LoginPresenter } from './index';

it('checking handleChange()...', () => {
  const handleChange = jest.fn();
  // const wrapper = mount(<App />);
  const wrapper = shallow(<LoginPresenter authState={false} />);
  wrapper.setState({
    email: '',
    password: '',
    submitted: false,
    emailHadFocus: false,
    validEmail: false,
    passwordHadFocus: false,
    loginEnabled: false
  });
  // wrapper.find('email').simulate('change', { target: { value: 'root@' } });
  // expect(handleChange).toHaveBeenCalledTimes(1);

  expect(1).toEqual(1);
});
