import React from 'react';
import { shallow } from 'enzyme';
import { EditRuleCellPresenter } from '../EditRuleCellRenderer';
import { SavePricingRuleButton, CancelEditingButton } from '../styled';
import { Text } from '_components';

describe('<EditRuleCellRenderer />', () => {
  const props = {
    isEditing: false,
    editingAnyPriceRule: false,
    startEditingRule: jest.fn(),
    cancelEditingRule: jest.fn(),
    saveEditedRule: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<EditRuleCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger startEditingRule when edit rule is clicked', () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <EditRuleCellPresenter {...props} startEditingRule={fn} />
    );

    wrapper
      .find(Text)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
  });

  it('should trigger cancelEditingRule when cancel button is clicked', () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <EditRuleCellPresenter
        {...props}
        cancelEditingRule={fn}
        isEditing={true}
        editingAnyPriceRule={true}
      />
    );

    wrapper
      .find(CancelEditingButton)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
  });

  it('should trigger saveEditedRule when save button is clicked', () => {
    const fn = jest.fn();

    const wrapper = shallow(
      <EditRuleCellPresenter
        {...props}
        saveEditedRule={fn}
        isEditing={true}
        editingAnyPriceRule={true}
      />
    );

    wrapper
      .find(SavePricingRuleButton)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
  });
});
