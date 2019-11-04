import React from 'react';
import { shallow } from 'enzyme';
import { PricingRules } from '_scenes/PricingRules';
import { PrimaryButton } from '_components';

describe('<PricingRules /> index route', () => {
  const props = {
    priceRuleActions: { createPriceRule: jest.fn() },
    editingAnyPriceRule: false,
    buyerTypes: [],
    buyerTypeActions: {
      fetchBuyerTypes: jest.fn()
    },
    seasons: []
  };

  it('should render corectly', () => {
    const wrapper = shallow(<PricingRules {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger createPriceRule when the button is clicked', () => {
    const priceRuleActions = { createPriceRule: jest.fn() };
    const wrapper = shallow(
      <PricingRules {...props} priceRuleActions={priceRuleActions} />
    );

    wrapper
      .find(PrimaryButton)
      .at(0)
      .simulate('click');

    expect(priceRuleActions.createPriceRule).toBeCalled();
  });
});
