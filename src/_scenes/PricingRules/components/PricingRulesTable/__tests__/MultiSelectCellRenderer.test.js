import React from 'react';
import { shallow, mount } from 'enzyme';
import { MultiSelectCellPresenter } from '../MultiSelectCellRenderer';
import { Icon } from '_components/Icon';
import { Checkbox } from '../styled';

describe('<MultiSelectCellRenderer />', () => {
  const props = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    rulePropertyValue: [2, 5],
    parent: {
      props: {
        height: '180',
        headerHeight: '45'
      }
    },
    columnData: {
      label: 'Price Scales',
      optionsKey: 'priceScales',
      priceScales: [
        { id: 2, name: 'DUGOUT' },
        { id: 10, name: 'FIELD' },
        { id: 5, name: 'GOLD' }
      ],
      labelFn: (o) => o.name
    }
  };

  it('should render correctly', () => {
    const wrapper = shallow(<MultiSelectCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should open the drop down if editable', () => {
    const fn = jest.fn();

    const wrapper = mount(
      <MultiSelectCellPresenter
        {...props}
        isEditing={true}
        updatePriceRuleProperty={fn}
      />
    );

    wrapper
      .find(Icon)
      .at(0)
      .simulate('click');

    wrapper
      .find(Checkbox)
      .at(0)
      .simulate('change');

    expect(fn).toBeCalled();

    wrapper.unmount();
  });

  it('should sort with the sort function correctly', () => {
    const columnData = {
      ...props.columnData,
      sortFn: (first, second) => (first.id >= second.id ? 1 : -1)
    };

    const wrapper = mount(
      <MultiSelectCellPresenter
        {...props}
        columnData={columnData}
        isEditing={true}
      />
    );

    expect(
      wrapper
        .instance()
        .items()
        .map((o) => o.name)
    ).toEqual(['DUGOUT', 'GOLD', 'FIELD']);

    wrapper.unmount();
  });
});
