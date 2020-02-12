import React from 'react';
import { shallow } from 'enzyme';
import { SortIcon } from '../SortIcon';

describe('<SortIcon />', () => {
  const props = {
    isFiltered: false,
    filterDirection: 'asc',
    onClick: jest.fn(),
  };

  it('should render correctly when not filtered', () => {
    const wrapper = shallow(<SortIcon {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when filtered asc', () => {
    const wrapper = shallow(<SortIcon {...props} isFiltered={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when filtered desc', () => {
    const wrapper = shallow(
      <SortIcon {...props} isFiltered={true} filterDirection="desc" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when clicked', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<SortIcon {...clonedProps} />);
    wrapper.simulate('click');

    expect(clonedProps.onClick).toHaveBeenCalled();
  });
});
