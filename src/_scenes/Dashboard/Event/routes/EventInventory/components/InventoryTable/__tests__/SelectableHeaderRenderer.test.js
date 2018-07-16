import React from 'react';
import { shallow } from 'enzyme';
import { SelectableHeaderPresenter } from '../SelectableHeaderRenderer';

describe('<SelectableHeaderPresenter />', () => {
  const props = { allSelected: false, selectAll: jest.fn() };

  it('should render correctly when allSelected is false', () => {
    const wrapper = shallow(<SelectableHeaderPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when allSelected is true', () => {
    const wrapper = shallow(<SelectableHeaderPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectAll when the inputs onchange event is triggered', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<SelectableHeaderPresenter {...clonedProps} />);
    wrapper.find('input').simulate('change');

    expect(clonedProps.selectAll).toHaveBeenCalled();
  });
});
