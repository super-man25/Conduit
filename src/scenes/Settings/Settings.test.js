import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import authActions from '../../state/auth/actions';

import {
  SiteHeader,
  LeftNav,
  Breadcrumbs,
  ScreenTitleBlock,
  H3
} from '../../_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import { TeamSettingsPresenter } from './components/TeamSettings';

import Settings, { SettingsPresenter } from './index';

describe('<SettingsPresenter />', () => {
  xit('contains an <PageWrapper /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find('PageWrapper')).toHaveLength(1);
  });

  it('contains a <SiteHeader /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(SiteHeader)).toHaveLength(1);
  });

  xit('contains a <FullContent /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find('FullContent')).toHaveLength(1);
  });

  it('contains a <LeftNav /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(LeftNav)).toHaveLength(1);
  });

  xit('contains a <PrimaryContent /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find('PrimaryContent')).toHaveLength(1);
  });

  it('contains a <Breadcrumbs /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
  });

  it('contains a <ScreenTitleBlock /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(ScreenTitleBlock)).toHaveLength(1);
  });

  it('contains a <ContactInfoSettings /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(ContactInfoSettings)).toHaveLength(1);
  });

  it('contains a <NotificationSettings /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(NotificationSettings)).toHaveLength(1);
  });

  xit('contains a <TeamSettingsPresenter /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(TeamSettingsPresenter)).toHaveLength(1);
  });

  it('contains an <H3 /> component', () => {
    const wrapper = shallow(<SettingsPresenter />);
    expect(wrapper.find(H3)).toHaveLength(1);
  });

  it('click on Logout link fires handleLogoutClick method', () => {
    const handleLogoutClickSpy = jest.spyOn(
      SettingsPresenter.prototype,
      'handleLogoutClick'
    );
    const wrapper = shallow(<SettingsPresenter authActions={authActions} />);
    expect(SettingsPresenter.prototype.handleLogoutClick).toHaveBeenCalledTimes(
      0
    );
    wrapper
      .find('#logout')
      .first()
      .simulate('click', { preventDefault: () => {} });
    expect(SettingsPresenter.prototype.handleLogoutClick).toHaveBeenCalledTimes(
      1
    );
    handleLogoutClickSpy.mockClear();
  });
});

describe('<SettingsPresenter />', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const logoutRequest = () => ({ type: 'auth/SIGN_OUT_ASYNC' }); // update this to use appropriate constant

  it('renders SettingsPresenter with userState prop from store.user', () => {
    const userTest = { present: false };
    // Stubbing out store. Would normally use a helper method. Did it inline for simplicity.
    const store = {
      getState: () => ({
        user: userTest
      }),
      dispatch: () => {},
      subscribe: () => {}
    };
    const subject = shallow(<Settings store={store} />).find(SettingsPresenter);
    const actual = subject.prop('userState');
    expect(actual).toBe(userTest);
  });

  it('dispatches the signOut action to the store when store.dispatch() used', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    // Dispatch the action
    store.dispatch(logoutRequest());
    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: 'auth/SIGN_OUT_ASYNC' };
    expect(actions).toEqual([expectedPayload]);
  });

  xit('dispatches the signOut action to the store when logout link clicked', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    // Render the component and submit the form
    const wrapper = shallow(
      <SettingsPresenter authActions={authActions} store={store} />
    );
    wrapper.find('#logout').simulate('click', { preventDefault: () => {} });
    // Test if the store dispatched the signOut action
    const actions = store.getActions();
    const expectedPayload = { type: 'auth/SIGN_OUT_ASYNC' };
    expect(actions).toEqual([expectedPayload]);
  });
});
