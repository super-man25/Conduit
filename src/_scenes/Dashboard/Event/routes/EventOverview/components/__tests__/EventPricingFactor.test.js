import React from 'react';
import { shallow, mount } from 'enzyme';
import { EDTextButton, NumberInputField } from '_components';
import { EventPricingFactorPresenter } from '../EventPricingFactor';
import configureStore from 'redux-mock-store';

describe('<EventPricingFactor />', () => {
  const initialState = {
    type: null,
    message: null
  };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  const eventScoreProps = {
    type: 'eventScoreModifier',
    unit: '$',
    base: 1,
    modifier: 1.5
  };
  const springProps = {
    type: 'springModifier',
    unit: '%',
    base: 1,
    modifier: 0.5
  };

  it('renders correctly for event score', () => {
    const wrapper = shallow(
      <EventPricingFactorPresenter {...eventScoreProps} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('modifier')).toBe(eventScoreProps.modifier);
  });

  it('renders correctly for spring', () => {
    const wrapper = shallow(<EventPricingFactorPresenter {...springProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('modifier')).toBe(springProps.modifier);
  });

  it('can update event score modifier value on change', () => {
    const wrapper = shallow(
      <EventPricingFactorPresenter {...eventScoreProps} store />
    );
    const spy = jest.spyOn(wrapper.instance(), 'update');
    const event = { target: { value: 1.5 } };
    wrapper.find(EDTextButton).simulate('click');
    wrapper
      .find(NumberInputField)
      .at(0)
      .simulate('change', event);
    expect(wrapper.state('modifier')).toBe(event.target.value);
    expect(spy).toHaveBeenCalled();
  });

  it('can update spring modifier value on change', () => {
    const wrapper = shallow(
      <EventPricingFactorPresenter {...springProps} store />
    );
    const spy = jest.spyOn(wrapper.instance(), 'update');
    const event = { target: { value: -1.5 } };
    wrapper.find(EDTextButton).simulate('click');
    wrapper
      .find(NumberInputField)
      .at(0)
      .simulate('change', event);
    expect(wrapper.state('modifier')).toBe(event.target.value);
    expect(spy).toHaveBeenCalled();
  });
});
