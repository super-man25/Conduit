import React from 'react';
import { shallow, mount } from 'enzyme';
import { MultiSelectGroupView } from '../MultiSelectGroupView';
import { Checkbox } from '../styled';

describe('<MultiSelectGroupView />', () => {
  const props = {
    categories: [{ id: 2, name: 'Value' }, { id: 3, name: 'Classic' }],
    grouped: {
      2: [
        { id: 6, name: 'Braves at Zephyrs' },
        { id: 18, name: 'Dogs FIGHT Cats' }
      ],
      3: [{ id: 23, name: 'Cardinals at Zephyrs' }]
    },
    selected: [18],
    labelFn: (o) => o.name,
    onItemClicked: jest.fn(),
    updatePriceRuleProperty: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<MultiSelectGroupView {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state()).toEqual({
      selectAllNext: {
        2: true,
        3: true
      }
    });
  });

  it('should call update price rule with all events from category', () => {
    const fn = jest.fn();
    const wrapper = mount(
      <MultiSelectGroupView {...props} updatePriceRuleProperty={fn} />
    );

    wrapper
      .find('p')
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
    expect(fn.mock.calls[0][0]).toEqual([6, 18]);
    expect(wrapper.state().selectAllNext).toEqual({ 2: false, 3: true });

    wrapper.unmount();
  });

  it('should call onItemClicked when an item is clicked', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <MultiSelectGroupView {...props} onItemClicked={fn} />
    );

    wrapper
      .find(Checkbox)
      .at(0)
      .simulate('change');

    expect(fn).toBeCalled();
  });
});
