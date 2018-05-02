
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { reducer } from '../../state/auth';
import {
  OuterWrapper,
  ContentWrapper,
  LogoName,
  H3,
  Label,
  Input,
  HelpBlockDiv,
  Button
} from '../../_components';
import LoginFormDiv from './components/LoginForm';

import { LoginPresenter } from './index';

const myAuth = {
  model: null,
  pending: false
};

const myAuthPending = {
  model: null,
  pending: true
};

describe('<LoginPresenter />', () => {

  it('contains an <OuterWrapper /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(OuterWrapper)).toHaveLength(1);
  });

  it('contains a <ContentWrapper /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(ContentWrapper)).toHaveLength(1);
  });

  it('contains a <LoginFormDiv /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(LoginFormDiv)).toHaveLength(1);
  });

  it('contains a <LogoName /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(LogoName)).toHaveLength(1);
  });

  it('contains an <H3 /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(H3)).toHaveLength(1);
  });

  it('contains two <Label /> components', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(Label)).toHaveLength(2);
  });

  it('contains two <Input /> components', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it('contains two <HelpBlockDiv /> components', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(HelpBlockDiv)).toHaveLength(2);
  });

  it('contains a <Button /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('contains no <img /> component when auth.pending is false', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('contains an <img /> component when auth is pending', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuthPending} />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('contains a <form /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('email and password input changes fire handleChange method', () => {
    const handleChangeSpy = jest.spyOn(LoginPresenter.prototype, 'handleChange');
    const wrapper = mount(<LoginPresenter authState={myAuth} />);
    wrapper.setState({
      email: '',
      password: '',
      submitted: false,
      emailHadFocus: false,
      validEmail: false,
      passwordHadFocus: false,
      loginEnabled: false
    });
    expect(LoginPresenter.prototype.handleChange).toHaveBeenCalledTimes(0);
    wrapper.find('#email').first().simulate('change', { target: { value: 'root@' } });
    expect(LoginPresenter.prototype.handleChange).toHaveBeenCalledTimes(1);
    wrapper.find('#password').first().simulate('change', { target: { value: '1234' } });
    expect(LoginPresenter.prototype.handleChange).toHaveBeenCalledTimes(2);
    handleChangeSpy.mockClear();
  });

  it('email and password input changes update component state', () => {
    const wrapper = mount(<LoginPresenter authState={myAuth} />);
    wrapper.setState({
      email: '',
      password: '',
      submitted: false,
      emailHadFocus: false,
      validEmail: false,
      passwordHadFocus: false,
      loginEnabled: false
    });
    expect(wrapper.state().loginEnabled).toEqual(false);
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().emailHadFocus).toEqual(false);
    wrapper.find('#email').first().simulate('change', { target: { value: 'root@dialexa.com', name: 'email' } });
    wrapper.find('#email').first().simulate('blur', { target: { name: 'email' } });
    expect(wrapper.state().email).toEqual('root@dialexa.com');
    expect(wrapper.state().emailHadFocus).toEqual(true);
    wrapper.setState({ validEmail: true });
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().loginEnabled).toEqual(false);
    expect(wrapper.state().passwordHadFocus).toEqual(false);
    wrapper.find('#password').first().simulate('change', { target: { value: 'password1', name: 'password' } });
    wrapper.find('#password').first().simulate('blur', { target: { name: 'password' } });
    expect(wrapper.state().password).toEqual('password1');
    expect(wrapper.state().passwordHadFocus).toEqual(true);
    expect(wrapper.state().loginEnabled).toEqual(true);
  });

});

// expect(wrapper.find('#email').first().props().value).toEqual('root@dialexa.com');


// p.s. Here's how I would test the props are wired properly:

// import React from 'react';
// import { shallow } from 'enzyme';

// import TestContainer, { TestComponent } from './TestContainer';

// it('renders TestComponent with approriate props from store', () => {
//   const userPermissions = {};
//   // Stubbing out store. Would normally use a helper method. Did it inline for simplicity.
//   const store = {
//     getState: () => ({
//       auth: { userPermissions },
//     }),
//     dispatch: () => {},
//     subscribe: () => {},
//   };
//   const subject = shallow(<TestContainer store={store} />).find(TestComponent);

//   const actual = subject.prop('permissions');
//   expect(actual).toBe(userPermissions);
// });


// tested.  handleBlur,
// tested.  handleChange,
// handleSubmit,
// emailCheck
