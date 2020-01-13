import React from 'react';
import { shallow } from 'enzyme';
import { SelectDropdown } from '_components';
import renderer from 'react-test-renderer';

const selectOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

describe('<SelectDropdown />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains a DropdownContainer', () => {
    const wrapper = shallow(
      <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
    );
    expect(wrapper.find('DropdownContainer')).toHaveLength(1);
  });

  it('contains a DropdownSelectedItem', () => {
    const wrapper = shallow(
      <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
    );
    expect(wrapper.find('DropdownSelectedItem')).toHaveLength(1);
  });

  it('contains a DropdownIconWrapper', () => {
    const wrapper = shallow(
      <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
    );
    expect(wrapper.find('DropdownIconWrapper')).toHaveLength(1);
  });

  it('should open the DropdownMenu on click', () => {
    const wrapper = shallow(
      <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
    );

    wrapper
      .find('DropdownSelectedItem')
      .at(0)
      .simulate('click');

    expect(wrapper.state().isOpen).toEqual(true);
    expect(wrapper.find('DropdownMenu')).toHaveLength(1);
    expect(wrapper.find('DropdownItem')).toHaveLength(3);
  });

  it('should trigger onChange when an option is clicked', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(
      <SelectDropdown
        selected={selectOptions[0]}
        options={selectOptions}
        onChange={mockOnChange}
      />
    );

    wrapper.setState({ isOpen: true });
    wrapper
      .find('DropdownItem')
      .at(1)
      .simulate('click');

    expect(wrapper.state().isOpen).toEqual(false);
    expect(mockOnChange).toHaveBeenCalledWith(selectOptions[1]);
  });
});
