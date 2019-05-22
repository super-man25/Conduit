import React from 'react';
import { shallow, mount } from 'enzyme';
import { SortIcon } from '../SortIcon';
import { FilterColumnHeader } from '../FilterColumnHeaderRenderer';
import { Filter } from '../Filter';

describe('<ScaleColumnHeaderRenderer />', () => {
  const props = {
    isFiltered: false,
    filterDirection: 'asc',
    setFilter: jest.fn(),
    disableSort: false,
    label: 'Label',
    filter: {
      name: 'priceScaleId',
      direction: 'asc'
    },
    filters: [],
    selectedFilters: [],
    setSelectedFilters: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<FilterColumnHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when disableSort is true', () => {
    const wrapper = shallow(
      <FilterColumnHeader {...props} disableSort={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isFiltered is true', () => {
    const wrapper = shallow(
      <FilterColumnHeader {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when sort isFiltered is true', () => {
    const wrapper = shallow(
      <FilterColumnHeader {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setFilter when <SortIcon /> onClick is fired', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<FilterColumnHeader {...clonedProps} />);
    wrapper.find(SortIcon).prop('onClick')();
    expect(clonedProps.setFilter).toHaveBeenCalled();
  });

  it('should render <Filter /> when state filterDropdownOpen is true', () => {
    const clonedProps = { ...props };
    const wrapper = mount(<FilterColumnHeader {...clonedProps} />);
    wrapper.setState({ filterDropdownOpen: true });

    expect(wrapper.find(Filter).length).toEqual(1);
  });
});
