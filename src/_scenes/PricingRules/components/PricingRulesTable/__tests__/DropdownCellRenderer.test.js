import React from 'react';
import { shallow, mount } from 'enzyme';
import { DropDownCellPresenter } from '../DropdownCellRenderer';
import { Dropdown, Option } from '../Dropdown';

describe('<DropdownCellRenderer />', () => {
  const props = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    cellData: { id: 2, name: 'DUGOUT' },
    columnData: {
      optionsKey: 'priceScales',
      priceScales: [{ id: 2, name: 'DUGOUT' }, { id: 5, name: 'GOLD' }],
      hasId: true
    },
    selectedItemId: 2
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DropDownCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger updatePriceRuleProperty function', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DropDownCellPresenter
        {...props}
        updatePriceRuleProperty={fn}
        isEditing={true}
      />
    );

    wrapper
      .find(Dropdown)
      .at(0)
      .simulate('click');
    wrapper
      .find(Option)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();

    wrapper.unmount();
  });
});
