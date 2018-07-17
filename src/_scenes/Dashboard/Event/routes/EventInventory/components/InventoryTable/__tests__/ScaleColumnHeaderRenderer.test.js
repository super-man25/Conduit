import React from 'react';
import { shallow, mount } from 'enzyme';
import { DefaultColumnHeaderPresenter } from '../ColumnHeaderRenderer';
import { SortIcon } from '../SortIcon';
import {
  ScaleColumnHeaderPresenter,
  ScaleFilterWithClickAway
} from '../ScaleColumnHeaderRenderer';
import { ScaleFilter } from '../ScaleFilter';
import { FilterListIcon } from '_components';
// import { ScaleFilter } from '../ScaleFilter';

describe('<ScaleColumnHeaderRenderer />', () => {
  const props = {
    isFiltered: false,
    filterDirection: 'asc',
    setFilter: jest.fn(),
    disableSort: false,
    label: 'Label',
    scaleFilters: [],
    selectedScaleFilters: [],
    setSelectedScaleFilters: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ScaleColumnHeaderPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when disableSort is true', () => {
    const wrapper = shallow(
      <ScaleColumnHeaderPresenter {...props} disableSort={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isFiltered is true', () => {
    const wrapper = shallow(
      <ScaleColumnHeaderPresenter {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when sort isFiltered is true', () => {
    const wrapper = shallow(
      <ScaleColumnHeaderPresenter {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setFilter when <SortIcon /> onClick is fired', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<ScaleColumnHeaderPresenter {...clonedProps} />);
    wrapper.find(SortIcon).prop('onClick')();
    expect(clonedProps.setFilter).toHaveBeenCalled();
  });

  it('should render <ScaleFilter /> when state scaleDropdownOpen is true', () => {
    const clonedProps = { ...props };
    const wrapper = mount(<ScaleColumnHeaderPresenter {...clonedProps} />);
    wrapper.setState({ scaleDropdownOpen: true });

    expect(wrapper.find(ScaleFilter).length).toEqual(1);
  });
});
