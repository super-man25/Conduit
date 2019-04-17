import React from 'react';
import { shallow } from 'enzyme';
import { DeleteRuleCellRenderer } from '../DeleteRuleCellRenderer';

describe('<DeleteRuleCellRenderer />', () => {
  const props = {
    ruleId: 1,
    deletePriceRule: jest.fn(),
    editingAnyPriceRule: false
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DeleteRuleCellRenderer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
