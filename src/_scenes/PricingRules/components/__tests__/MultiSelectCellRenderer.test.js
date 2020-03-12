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
        headerHeight: '45',
      },
    },
    columnData: {
      label: 'Price Scales',
      optionsKey: 'priceScales',
      priceScales: [
        { id: 2, name: 'DUGOUT' },
        { id: 10, name: 'FIELD' },
        { id: 5, name: 'GOLD' },
      ],
      labelFn: (o) => o.name,
    },
  };

  const buyerTypesProps = {
    isEditing: false,
    updatePriceRuleProperty: jest.fn(),
    rulePropertyValue: [2, 10, 8],
    parent: {
      props: {
        height: '180',
        headerHeight: '45',
      },
    },
    columnData: {
      label: 'Buyer Types',
      optionsKey: 'buyerTypes',
      buyerTypes: [
        {
          id: 2,
          code: 'DUGOUT',
          publicDescription: 'desc1',
          isInPriceStructure: false,
        },
        {
          id: 10,
          code: 'FIELD',
          publicDescription: 'desc2',
          isInPriceStructure: true,
        },
        {
          id: 5,
          code: 'GOLD',
          publicDescription: 'desc3',
          isInPriceStructure: false,
        },
      ],
      labelFn: (o) => o.code,
    },
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
      sortFn: (first, second) => (first.id >= second.id ? 1 : -1),
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

  it('should append correctly for buyer types', () => {
    const columnData = {
      ...buyerTypesProps.columnData,
      sortFn: (first, second) => (first.id >= second.id ? 1 : -1),
    };

    const wrapper = mount(
      <MultiSelectCellPresenter
        {...buyerTypesProps}
        columnData={columnData}
        isEditing={true}
      />
    );

    expect(
      wrapper
        .instance()
        .items()
        .map((o) => o.code)
    ).toEqual(['DUGOUT', 'Unknown', 'FIELD']);

    expect(
      wrapper
        .instance()
        .items()
        .map((o) => o.publicDescription)
    ).toEqual(['desc1', 8, 'desc2']);

    wrapper.unmount();
  });
});
