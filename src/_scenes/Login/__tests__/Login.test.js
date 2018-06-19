import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import authActions from '_state/auth/actions';
import alertActions from '_state/alert/actions';

import Login, { LoginPresenter } from '../index';

const myAuth = {
  model: null,
  pending: false
};

const myAlert = {
  show: false,
  type: null,
  message: ''
};

describe('<LoginPresenter />', () => {
  it('renders correctly as login form when forgot=false', () => {
    const wrapper = shallow(
      <LoginPresenter authState={myAuth} alertState={myAlert} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly as forgot password form when forgot=true', () => {
    const wrapper = shallow(
      <LoginPresenter authState={myAuth} alertState={myAlert} />
    );
    wrapper.setState({
      forgot: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('email and password input changes fire handleChange method', () => {
    // Unfortunately when methods aren't passed as props, we have to follow these steps
    // Get instance of component, attach spy to method we want to spy on, and forceUpdate.
    // ForceUpdate is required to attach the spy. \_o_/
    const wrapper = mount(
      <LoginPresenter
        authState={myAuth}
        alertState={myAlert}
        alertActions={alertActions}
      />
    );
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleChange');
    instance.forceUpdate();

    wrapper.setState({
      email: '',
      password: '',
      submitted: false,
      emailHadFocus: false,
      validEmail: false,
      passwordHadFocus: false,
      submitEnabled: false
    });
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('#email')
      .first()
      .simulate('change', { target: { value: 'root@' } });
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper
      .find('#password')
      .first()
      .simulate('change', { target: { value: '1234' } });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
  });

  it('email and password input changes update component state', () => {
    const wrapper = mount(
      <LoginPresenter
        authState={myAuth}
        alertState={myAlert}
        alertActions={alertActions}
      />
    );
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
    expect(wrapper.state().submitEnabled).toEqual(false);
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().emailHadFocus).toEqual(false);
    wrapper
      .find('#email')
      .first()
      .simulate('change', {
        target: { value: 'root@dialexa.com', name: 'email' }
      });
    wrapper
      .find('#email')
      .first()
      .simulate('blur', { target: { name: 'email' } });
    expect(wrapper.state().email).toEqual('root@dialexa.com');
    expect(wrapper.state().emailHadFocus).toEqual(true);
    wrapper.setState({ validEmail: true });
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().submitEnabled).toEqual(false);
    expect(wrapper.state().passwordHadFocus).toEqual(false);
    wrapper
      .find('#password')
      .first()
      .simulate('change', { target: { value: 'password1', name: 'password' } });
    wrapper
      .find('#password')
      .first()
      .simulate('blur', { target: { name: 'password' } });
    expect(wrapper.state().password).toEqual('password1');
    expect(wrapper.state().passwordHadFocus).toEqual(true);
    expect(wrapper.state().submitEnabled).toEqual(true);
  });

  it('clicking submit button fires handleSubmit method, which updates component state', () => {
    const wrapper = mount(
      <LoginPresenter
        authState={myAuth}
        alertState={myAlert}
        authActions={authActions}
      />
    );
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    instance.forceUpdate();

    expect(wrapper.state().submitted).toEqual(false);
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('#login')
      .first()
      .simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().submitted).toEqual(true);
    spy.mockClear();
  });

  it('renders LoginPresenter with authState prop from store.auth', () => {
    const authTest = { pending: false };
    // Stubbing out store. Would normally use a helper method. Did it inline for simplicity.
    const store = {
      getState: () => ({
        auth: authTest
      }),
      dispatch: () => {},
      subscribe: () => {}
    };
    const subject = shallow(<Login store={store} />).find(LoginPresenter);
    const actual = subject.prop('authState');
    expect(actual).toBe(authTest);
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
    const props = {
      authState: myAuth,
      alertState: myAlert,
      authActions: {
        signIn: jest.fn(),
        forgotPass: jest.fn()
      }
    };
    const authActionsSignIn = jest.spyOn(props.authActions, 'signIn');
    const wrapper = shallow(<LoginPresenter {...props} />);
    expect(wrapper.state().submitted).toEqual(false);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state().submitted).toEqual(true);
    expect(authActionsSignIn).toBeCalled();
  });

  it('dispatches the forgotPass action to the store when forgot password form submitted', () => {
    // Render the component and submit the form
    const props = {
      authState: myAuth,
      alertState: myAlert,
      authActions: {
        signIn: jest.fn(),
        forgotPass: jest.fn()
      }
    };
    const authActionsForgotPass = jest.spyOn(props.authActions, 'forgotPass');
    const wrapper = shallow(<LoginPresenter {...props} />);
    wrapper.state().forgot = true;
    expect(wrapper.state().submitted).toEqual(false);

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state().submitted).toEqual(true);
    expect(authActionsForgotPass).toBeCalled();
  });

  it('the emailCheck() method that returns true for a valid email, and false otherwise', () => {
    const wrapper = shallow(
      <LoginPresenter authState={myAuth} alertState={myAlert} />
    );
    expect(wrapper.instance().emailCheck('greg@dialexa')).toEqual(false);
    expect(wrapper.instance().emailCheck('greg@dialexa.com')).toEqual(true);
  });
});
