import React from 'react';
import { shallow } from 'enzyme';
import { ToggleCellRenderer } from '../ToggleCellRenderer';
import { Toggle } from '_components';

describe('<ToggleCellRenderer />', () => {
  const props = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    rulePropertyValue: false,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ToggleCellRenderer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not trigger updatePriceRuleProperty function when isEditing is false', () => {
    const wrapper = shallow(<ToggleCellRenderer {...props} />);

    const toggleProps = wrapper
      .find(Toggle)
      .at(0)
      .props();

    expect(toggleProps).toEqual(expect.objectContaining({ isDisabled: true }));
  });
});
