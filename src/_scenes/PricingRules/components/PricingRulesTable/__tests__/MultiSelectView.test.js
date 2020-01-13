import React from 'react';
import { shallow, mount } from 'enzyme';
import { MultiSelectView } from '../MultiSelectView';
import { Checkbox } from '../styled';

describe('<MultiSelectView />', () => {
  const props = {
    options: [{ id: 2, name: 'Diamond Club' }, { id: 15, name: 'Dugout Club' }],
    selected: [2],
    onItemClicked: jest.fn(),
    labelFn: jest.fn(),
  };

  it('should render correctly', () => {
    const wrapper = shallow(<MultiSelectView {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onItemClicked when an item is clicked', () => {
    const fn = jest.fn();
    const wrapper = mount(<MultiSelectView {...props} onItemClicked={fn} />);

    wrapper
      .find(Checkbox)
      .at(0)
      .simulate('change');

    expect(fn).toBeCalled();
    wrapper.unmount();
  });
});
