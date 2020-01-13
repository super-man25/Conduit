import React from 'react';
import { shallow } from 'enzyme';
import { ToggleCellPresenter } from '../ToggleCellRenderer';
import { Toggle } from '_components';

describe('<ToggleCellPresenter />', () => {
  const props = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    rulePropertyValue: false,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ToggleCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not trigger updatePriceRuleProperty function when isEditing is false', () => {
    const wrapper = shallow(<ToggleCellPresenter {...props} />);

    const toggleProps = wrapper
      .find(Toggle)
      .at(0)
      .props();

    expect(toggleProps).toEqual(expect.objectContaining({ isDisabled: true }));
  });

  it('should trigger updatePriceRuleProperty function when isEditing is true', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <ToggleCellPresenter
        {...props}
        updatePriceRuleProperty={fn}
        isEditing={true}
      />
    );

    wrapper
      .find(Toggle)
      .at(0)
      .simulate('change');

    expect(fn).toBeCalled();
  });
});
