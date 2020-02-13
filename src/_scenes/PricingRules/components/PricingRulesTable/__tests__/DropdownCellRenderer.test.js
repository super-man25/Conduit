import React from 'react';
import { shallow, mount } from 'enzyme';
import { DropDownCellPresenter } from '../DropdownCellRenderer';
import { Dropdown, Option } from '../Dropdown';

describe('<DropdownCellRenderer />', () => {
  const props = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    cellData: { id: 2, name: 'DUGOUT' },
    parent: {
      props: {
        height: '180',
        headerHeight: '45',
      },
    },
    columnData: {
      optionsKey: 'priceScales',
      priceScales: [
        { id: 2, name: 'DUGOUT' },
        { id: 1, name: 'GOLD' },
      ],
      hasId: true,
    },
    selectedItemId: 2,
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

  it('should sort with the sort function correctly', () => {
    const columnData = {
      ...props.columnData,
      sortFn: (first, second) => (first.id >= second.id ? 1 : -1),
    };

    const wrapper = mount(
      <DropDownCellPresenter
        {...props}
        columnData={columnData}
        isEditing={true}
      />
    );

    expect(wrapper.find(Option).map((o) => o.text())).toEqual([
      'None',
      'GOLD',
      'DUGOUT',
    ]);

    wrapper.unmount();
  });
});
