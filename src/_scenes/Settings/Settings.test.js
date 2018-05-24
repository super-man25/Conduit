import React from 'react';
import { shallow } from 'enzyme';

import {
  SiteHeader,
  LeftNav,
  Breadcrumbs,
  ScreenTitleBlock,
  H3
} from '_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import { TeamSettingsPresenter } from './components/TeamSettings';

import Settings, { SettingsPresenter } from './index';

const authState = { model: { id: 1, firstName: 'root', lastName: 'root' } };

describe('<SettingsPresenter />', () => {
  xit('contains an <PageWrapper /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find('PageWrapper')).toHaveLength(1);
  });

  it('contains a <SiteHeader /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(SiteHeader)).toHaveLength(1);
  });

  xit('contains a <FullContent /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find('FullContent')).toHaveLength(1);
  });

  it('contains a <LeftNav /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(LeftNav)).toHaveLength(1);
  });

  xit('contains a <PrimaryContent /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find('PrimaryContent')).toHaveLength(1);
  });

  it('contains a <Breadcrumbs /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
  });

  it('contains a <ScreenTitleBlock /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(ScreenTitleBlock)).toHaveLength(1);
  });

  it('contains a <ContactInfoSettings /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(ContactInfoSettings)).toHaveLength(1);
  });

  it('contains a <NotificationSettings /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(NotificationSettings)).toHaveLength(1);
  });

  xit('contains a <TeamSettingsPresenter /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(TeamSettingsPresenter)).toHaveLength(1);
  });

  it('contains an <H3 /> component', () => {
    const wrapper = shallow(<SettingsPresenter authState={authState} />);
    expect(wrapper.find(H3)).toHaveLength(1);
  });
});

describe('<SettingsPresenter />', () => {
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
});
