import React from 'react';
import { shallow } from 'enzyme';
import { PricingRules } from '_scenes/PricingRules';
import { PrimaryButton } from '_components';

describe('<PricingRules /> index route', () => {
  const props = {
    createPriceRule: jest.fn(),
    editingAnyPriceRule: false
  };

  it('should render corectly', () => {
    const wrapper = shallow(<PricingRules {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger createPriceRule when the button is clicked', () => {
    const fn = jest.fn();
    const wrapper = shallow(<PricingRules {...props} createPriceRule={fn} />);

    wrapper
      .find(PrimaryButton)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
  });
});
