import React from 'react';
import { shallow } from 'enzyme';
import { DateRangeDropdown } from '_components';
import renderer from 'react-test-renderer';

const from = new Date('2018-04-17T19:28:43+00:00');
const to = new Date('2018-04-20T19:28:43+00:00');

describe('<DateRangeDropdown />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DateRangeDropdown
          startPlaceholder="Start Date"
          endPlaceholder="End Date"
          from={from}
          to={to}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains a DateRangeInput', () => {
    const wrapper = shallow(
      <DateRangeDropdown
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        from={from}
        to={to}
      />
    );
    expect(wrapper.find('DateRangeInput')).toHaveLength(2);
  });

  it('contains a DropdownSelectedItem', () => {
    const wrapper = shallow(
      <DateRangeDropdown
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        from={from}
        to={to}
      />
    );
    expect(wrapper.find('DropdownSelectedItem')).toHaveLength(2);
  });

  it('contains a DropdownIconWrapper', () => {
    const wrapper = shallow(
      <DateRangeDropdown
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        from={from}
        to={to}
      />
    );
    expect(wrapper.find('DropdownIconWrapper')).toHaveLength(2);
  });

  it('should open the From DropdownMenu on click', () => {
    const wrapper = shallow(
      <DateRangeDropdown
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        from={from}
        to={to}
      />
    );

    wrapper
      .find('DateRangeInput')
      .at(0)
      .simulate('click');

    expect(wrapper.state().fromIsOpen).toEqual(true);
    expect(wrapper.find('DropdownMenu')).toHaveLength(1);
  });

  it('should open the To DropdownMenu on click', () => {
    const wrapper = shallow(
      <DateRangeDropdown
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        from={from}
        to={to}
      />
    );

    wrapper
      .find('DateRangeInput')
      .at(1)
      .simulate('click');

    expect(wrapper.state().toIsOpen).toEqual(true);
    expect(wrapper.find('DropdownMenu')).toHaveLength(1);
  });
});
