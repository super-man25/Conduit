import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Dropdown } from '../DropdownOLD';

const createProps = () => ({
  parseOption: (option) => option.label,
  renderSelected: (option) => <div>{option.label}</div>,
  options: [
    { label: 'Option 1', value: 'Value 1' },
    { label: 'Option 2', value: 'Value 2' },
  ],
  selected: { label: 'Option 1', value: 'Value 1' },
  noneSelected: 'None selected',
  onChange: jest.fn(),
});

describe('<Dropdown />', () => {
  it('renders correctly with none selected', () => {
    const props = createProps();
    const tree = renderer.create(<Dropdown {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a selected item', () => {
    const props = createProps();
    props.selected = props.options[0];
    const tree = renderer.create(<Dropdown {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opens the dropdown when clicked', () => {
    const props = createProps();
    const wrapper = shallow(<Dropdown {...props} />);

    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();

    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onChange when an option is clicked', () => {
    const props = createProps();
    const wrapper = mount(<Dropdown {...props} />);

    wrapper.simulate('click');
    const firstOption = wrapper.find('DropdownMenuOption').at(0);
    firstOption.simulate('click');
    expect(props.onChange).toHaveBeenCalledWith(
      props.options[0],
      props.selected,
      props.options
    );
  });
});
