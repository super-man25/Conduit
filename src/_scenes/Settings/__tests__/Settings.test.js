import React from 'react';
import { shallow } from 'enzyme';
import {
  SiteHeader,
  LeftNav,
  PrimaryContent,
  PageWrapper,
  FullContent
} from '_components';
import { Settings } from '../index';

const authState = { model: { id: 1, firstName: 'groot', lastName: 'groot' } };

describe('<Settings />', () => {
  xit('contains an <PageWrapper /> component', () => {
    const wrapper = shallow(<Settings authState={authState} />);
    expect(wrapper.find(PageWrapper)).toHaveLength(1);
  });

  it('contains a <SiteHeader /> component', () => {
    const wrapper = shallow(<Settings authState={authState} />);
    expect(wrapper.find(SiteHeader)).toHaveLength(1);
  });

  xit('contains a <FullContent /> component', () => {
    const wrapper = shallow(<Settings authState={authState} />);
    expect(wrapper.find(FullContent)).toHaveLength(1);
  });

  it('contains a <LeftNav /> component', () => {
    const wrapper = shallow(<Settings authState={authState} />);
    expect(wrapper.find(LeftNav)).toHaveLength(1);
  });

  it('contains a <PrimaryContent /> component', () => {
    const wrapper = shallow(<Settings authState={authState} />);
    expect(wrapper.find(PrimaryContent)).toHaveLength(1);
  });
});
