import React from 'react';
import { shallow } from 'enzyme';
import { MultiSelect, GroupedSplitButton } from '../MultiSelect';
import { SplitButtonHalf } from '../styled';

describe('<MultiSelect />', () => {
  const props = {
    options: [
      { id: 2, name: 'Braves at Zephyrs' },
      { id: 5, name: 'Dogs at Cats' },
      { id: 17, name: 'Mariners at Zephyrs' }
    ],
    selected: [17],
    labelFn: jest.fn(),
    toggleSelectAll: jest.fn(),
    label: 'Events',
    isGroupable: false,
    updatePriceRuleProperty: jest.fn(),
    onItemClicked: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<MultiSelect {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set selectAllNext to false if all options selected', () => {
    const selected = [2, 5, 17];
    const wrapper = shallow(<MultiSelect {...props} selected={selected} />);

    expect(wrapper.state().selectAllNext).toBe(false);
  });

  it('should update the state if the grouped view is toggled', () => {
    const wrapper = shallow(<MultiSelect {...props} isGroupable={true} />);

    expect(wrapper.find(GroupedSplitButton).at(0).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<GroupedSplitButton />', () => {
  const props = {
    isGrouped: true,
    selectGrouping: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<GroupedSplitButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectGrouping prop function', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <GroupedSplitButton {...props} selectGrouping={fn} />
    );

    wrapper
      .find(SplitButtonHalf)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalledWith(false);
  });
});
