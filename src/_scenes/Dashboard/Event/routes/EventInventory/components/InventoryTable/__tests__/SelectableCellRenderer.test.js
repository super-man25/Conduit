import React from 'react';
import { shallow } from 'enzyme';
import { SelectableColumnCellPresenter } from '../SelectableCellRenderer';

describe('<SelectableCellPresenter />', () => {
  const props = { isSelected: false, select: jest.fn() };

  it('should render correctly when isSelected is false', () => {
    const wrapper = shallow(<SelectableColumnCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isSelected is true', () => {
    const wrapper = shallow(
      <SelectableColumnCellPresenter {...props} isSelected={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call select when the checkbox input triggers onChange', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <SelectableColumnCellPresenter
        {...props}
        isSelected={true}
        select={mockFn}
      />
    );
    wrapper.find('input').simulate('change');

    expect(mockFn).toHaveBeenCalled();
  });
});
