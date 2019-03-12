import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  EDTextButton,
  EventPriceModifierPresenter
} from '../EventPriceModifier';
import { NumberInputField } from '_components';

describe('<EventPriceModifierPresenter />', () => {
  const defaultProps = {
    event: {
      id: 1,
      percentPriceModifier: 10
    }
  };

  const negativeProps = {
    event: {
      id: 1,
      percentPriceModifier: -10
    }
  };

  it('renders correctly', () => {
    const wrapper = shallow(<EventPriceModifierPresenter {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('percentPriceModifierInvalid')).toBe(false);
    expect(wrapper.state().alertState.type).toBe(null);
    expect(wrapper.state().alertState.message).toBe(null);
  });

  it('will run saveUpdate when save is clicked', () => {
    const wrapper = mount(<EventPriceModifierPresenter {...defaultProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'saveUpdate');
    wrapper.find(EDTextButton).simulate('click');
    wrapper.find(EDTextButton).simulate('click');
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('can update state values on change', () => {
    const wrapper = mount(<EventPriceModifierPresenter {...defaultProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'update');
    const event = { target: { value: 30 } };
    wrapper.find(EDTextButton).simulate('click');
    wrapper
      .find(NumberInputField)
      .at(0)
      .simulate('change', event);
    expect(wrapper.state().event.percentPriceModifier).toBe(30);
    expect(spy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('gets the correct noun', () => {
    let wrapper = mount(<EventPriceModifierPresenter {...defaultProps} />);
    expect(wrapper.html()).toContain('increase');
    wrapper.unmount();

    wrapper = mount(<EventPriceModifierPresenter {...negativeProps} />);
    expect(wrapper.html()).toContain('decrease');
    wrapper.unmount();
  });
});
