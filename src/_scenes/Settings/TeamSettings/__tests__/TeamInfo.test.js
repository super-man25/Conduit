import { shallow } from 'enzyme';
import React from 'react';
import { SelectBox, SettingBorderButton, SettingEditButton } from '_components';
import { TeamInfo } from '../components/TeamInfo';

describe('<TeamInfo />', () => {
  const props = {
    id: 1,
    name: 'New York Mets',
    pricingInterval: 15,
    update: jest.fn(),
    resetDirtyPricingInterval: jest.fn(),
    setPricingInterval: jest.fn()
  };

  it('renders correctly', () => {
    const wrapper = shallow(<TeamInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isEditing')).toBe(false);
  });

  it('renders correctly when isEditing is true', () => {
    const wrapper = shallow(<TeamInfo {...props} />);
    wrapper.setState({ isEditing: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('toggles isEditing', () => {
    const wrapper = shallow(<TeamInfo {...props} />);
    expect(wrapper.find(SettingEditButton)).toHaveLength(1);
    wrapper.find(SettingEditButton).simulate('click');
    expect(wrapper.state().isEditing).toBe(true);
    expect(props.resetDirtyPricingInterval).toBeCalled();
  });

  it('updates pricingInterval', () => {
    const wrapper = shallow(<TeamInfo {...props} />);
    wrapper.setState({ isEditing: true });
    expect(wrapper.find(SettingBorderButton)).toHaveLength(1);
    wrapper.find(SettingBorderButton).simulate('click');
    expect(props.update).toBeCalled();
  });

  it('modifies dirtyPricingInterval', () => {
    const wrapper = shallow(<TeamInfo {...props} />);
    wrapper.setState({ isEditing: true });
    expect(wrapper.find(SelectBox)).toHaveLength(1);
    wrapper.find(SelectBox).simulate('change', { target: { value: '60' } });
    expect(props.setPricingInterval).toBeCalled();
  });
});
