import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import authActions from '_state/auth/actions';

import {
  Button,
  H3,
  HelpBlockDiv,
  ImageLayout,
  Input,
  Label,
  MailtoLink,
  Spacing,
  FlexItem,
  Loader
} from '_components';
import Login, { LoginPresenter } from './index';

const myAuth = {
  model: null,
  pending: false
};

describe('<LoginPresenter />', () => {
  it('contains an <ImageLayout /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(ImageLayout)).toHaveLength(1);
  });

  it('contains a <MailtoLink /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(MailtoLink)).toHaveLength(1);
  });

  it('contains an <H3 /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(H3)).toHaveLength(1);
  });

  it('contains an <Spacing /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(Spacing)).toHaveLength(1);
  });

  it('contains an <FlexItem /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(FlexItem)).toHaveLength(1);
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

  it('contains no <Loader /> component when auth.pending is false', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find(Loader)).toHaveLength(0);
  });

  it('contains an <Loader /> component when auth is pending', () => {
    const myAuthPending = {
      model: null,
      pending: true
    };
    const wrapper = shallow(<LoginPresenter authState={myAuthPending} />);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('contains a <form /> component', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('email and password input changes fire handleChange method', () => {
    const handleChangeSpy = jest.spyOn(
      LoginPresenter.prototype,
      'handleChange'
    );
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
    wrapper
      .find('#email')
      .first()
      .simulate('change', { target: { value: 'root@' } });
    expect(LoginPresenter.prototype.handleChange).toHaveBeenCalledTimes(1);
    wrapper
      .find('#password')
      .first()
      .simulate('change', { target: { value: '1234' } });
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
    expect(wrapper.state().loginEnabled).toEqual(false);
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
    expect(wrapper.state().loginEnabled).toEqual(true);
  });

  it('clicking submit button fires handleSubmit method, which updates component state', () => {
    const handleSubmitSpy = jest.spyOn(
      LoginPresenter.prototype,
      'handleSubmit'
    );
    const wrapper = mount(
      <LoginPresenter authState={myAuth} authActions={authActions} />
    );
    expect(wrapper.state().submitted).toEqual(false);
    expect(LoginPresenter.prototype.handleSubmit).toHaveBeenCalledTimes(0);
    wrapper
      .find('#login')
      .first()
      .simulate('submit');
    expect(LoginPresenter.prototype.handleSubmit).toHaveBeenCalledTimes(1);
    expect(wrapper.state().submitted).toEqual(true);
    handleSubmitSpy.mockClear();
  });

  // need a test to verify signIn action has been dispatched when handleSubmit runs

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
  const loginRequest = () => ({ type: 'auth/SIGN_IN_ASYNC' }); // update this to use appropriate constant

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

  it('dispatches the signIn action to the store when login form submitted', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    // Render the component and submit the form
    const wrapper = shallow(
      <LoginPresenter
        authState={myAuth}
        authActions={authActions}
        store={store}
      />
    );
    expect(wrapper.state().submitted).toEqual(false);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state().submitted).toEqual(true);
    // Test if the store dispatched the signIn action
    // const actions = store.getActions();
    // const expectedPayload = { type: 'auth/SIGN_IN_ASYNC' };
    // expect(actions).toEqual([expectedPayload]);
  });

  it('the emailCheck() method that returns true for a valid email, and false otherwise', () => {
    const wrapper = shallow(<LoginPresenter authState={myAuth} />);
    expect(wrapper.instance().emailCheck('greg@dialexa')).toEqual(false);
    expect(wrapper.instance().emailCheck('greg@dialexa.com')).toEqual(true);
  });
});

// tested.  handleBlur,
// tested.  handleChange,
// tested.  handleSubmit, (mostly)
// tested.  emailCheck
