import React from 'react';
import { shallow, mount } from 'enzyme';
import { SecondaryPricingRule } from '../components/SecondaryPricingRule';
import {
  SettingEditButton,
  SettingSaveButton,
  SettingCancelButton,
  NumberInputField
} from '_components';

describe('<SecondaryPricingRule />', () => {
  const defaultProps = {
    id: 1,
    percent: 10,
    constant: null
  };

  it('renders correctly', () => {
    const wrapper = shallow(<SecondaryPricingRule {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('percentInvalid')).toBe(false);
    expect(wrapper.state('constantInvalid')).toBe(false);
    expect(wrapper.state().alertState.type).toBe(null);
    expect(wrapper.state().alertState.message).toBe(null);
  });

  it('Can toggle edit state correctly', () => {
    const wrapper = shallow(<SecondaryPricingRule {...defaultProps} />);
    wrapper.find(SettingEditButton).simulate('click');
    expect(wrapper.state('isEditing')).toBe(true);
    wrapper.find(SettingCancelButton).simulate('click');
    expect(wrapper.state('isEditing')).toBe(false);
  });

  it('Can handle switching focus correctly', () => {
    const wrapper = mount(<SecondaryPricingRule {...defaultProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleFocus');
    wrapper.find(SettingEditButton).simulate('click');
    expect(wrapper.find(NumberInputField)).toHaveLength(2);
    wrapper
      .find(NumberInputField)
      .at(1)
      .simulate('focus');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state('percent')).toBe(null);
    expect(wrapper.state('constant')).toBe(null);
    wrapper.unmount();
  });

  it('Will run saveSettings when save is clicked', () => {
    const wrapper = mount(<SecondaryPricingRule {...defaultProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveSettings');
    wrapper.find(SettingEditButton).simulate('click');
    wrapper.find(SettingSaveButton).simulate('click');
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('Can update state values on change', () => {
    const wrapper = mount(<SecondaryPricingRule {...defaultProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'update');
    const event = { target: { name: 'percent', value: 15 } };
    wrapper.find(SettingEditButton).simulate('click');
    wrapper
      .find(NumberInputField)
      .at(0)
      .simulate('change', event);
    expect(wrapper.state('percent')).toBe(15);
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
