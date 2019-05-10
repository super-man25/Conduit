import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { LoginPresenter } from '../index';

const props = {
  authState: {
    model: null,
    pending: false
  },
  authActions: {
    forgotPass: jest.fn(),
    signIn: jest.fn()
  }
};

describe('<LoginPresenter />', () => {
  it('renders correctly as login form when forgot=false', () => {
    const wrapper = shallow(<LoginPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly as forgot password form when forgot=true', () => {
    const wrapper = shallow(<LoginPresenter {...props} />);
    wrapper.setState({ forgot: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('email and password input changes fire handleChange method', () => {
    // Unfortunately when methods aren't passed as props, we have to follow these steps
    // Get instance of component, attach spy to method we want to spy on, and forceUpdate.
    // ForceUpdate is required to attach the spy. \_o_/
    const wrapper = mount(<LoginPresenter {...props} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleChange');
    instance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    const emailInput = wrapper.find('#email').first();
    emailInput.getDOMNode().value = 'root@';
    emailInput.simulate('change');

    const passwordInput = wrapper.find('#password').first();
    passwordInput.getDOMNode().value = '1234';
    passwordInput.simulate('change');

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('email and password input changes update component state', () => {
    const wrapper = mount(<LoginPresenter {...props} />);
    wrapper.setState({
      email: '',
      password: '',
      forgot: '',
      submitted: false,
      emailHadFocus: false,
      validEmail: false,
      passwordHadFocus: false,
      submitEnabled: false
    });
    expect(wrapper.instance().submitEnabled()).toEqual(false);

    const emailInput = wrapper.find('#email').first();
    emailInput.getDOMNode().value = 'root@dialexa.com';
    emailInput.simulate('change');
    emailInput.simulate('blur');

    expect(wrapper.state().email).toEqual('root@dialexa.com');
    expect(wrapper.state().touched.email).toEqual(true);
    expect(wrapper.instance().submitEnabled()).toEqual(false);

    const passwordInput = wrapper.find('#password').first();
    passwordInput.getDOMNode().value = 'password';
    passwordInput.simulate('change');
    passwordInput.simulate('blur');

    expect(wrapper.state().password).toEqual('password');
    expect(wrapper.state().touched.password).toEqual(true);
    expect(wrapper.instance().submitEnabled()).toEqual(true);
  });

  it('clicking submit button fires handleSubmit method, which updates component state', () => {
    const wrapper = mount(<LoginPresenter {...props} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    instance.forceUpdate();

    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('#login')
      .first()
      .simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().submitted).toEqual(true);
    spy.mockClear();
  });
});

describe('<LoginPresenter />', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const loginRequest = () => ({ type: 'auth/SIGN_IN_ASYNC' });
  const forgotPassRequest = () => ({ type: 'auth/FORGOT_PASS_ASYNC' });

  it('dispatches the signIn action to the store when store.dispatch() used', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    // Dispatch the action
    store.dispatch(loginRequest());
    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: 'auth/SIGN_IN_ASYNC' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('dispatches the forgotPass action to the store when store.dispatch() used', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    // Dispatch the action
    store.dispatch(forgotPassRequest());
    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: 'auth/FORGOT_PASS_ASYNC' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('dispatches the signIn action to the store when login form submitted', () => {
    // Render the component and submit the form
    const authActions = {
      signIn: jest.fn(),
      forgotPass: jest.fn()
    };
    const authActionsSignIn = jest.spyOn(authActions, 'signIn');
    const wrapper = shallow(
      <LoginPresenter {...props} authActions={authActions} />
    );
    expect(wrapper.state().submitted).toEqual(false);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state().submitted).toEqual(true);
    expect(authActionsSignIn).toBeCalled();
  });

  it('dispatches the forgotPass action to the store when forgot password form submitted', () => {
    // Render the component and submit the form
    const authActions = {
      forgotPass: jest.fn(),
      signIn: jest.fn()
    };
    const authState = {
      forgot: true
    };
    const wrapper = shallow(
      <LoginPresenter
        {...props}
        authActions={authActions}
        authState={authState}
      />
    );
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state().submitted).toEqual(false);
    expect(authActions.forgotPass).toBeCalled();
  });
});
