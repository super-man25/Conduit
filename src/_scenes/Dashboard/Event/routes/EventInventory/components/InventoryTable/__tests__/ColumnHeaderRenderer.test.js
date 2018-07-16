import React from 'react';
import { shallow } from 'enzyme';
import { DefaultColumnHeaderPresenter } from '../ColumnHeaderRenderer';
import { SortIcon } from '../SortIcon';

describe('<DefaultColumnHeaderPresenter />', () => {
  const props = {
    isFiltered: false,
    filterDirection: 'asc',
    setFilter: jest.fn(),
    disableSort: false,
    label: 'Label'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DefaultColumnHeaderPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when disableSort is true', () => {
    const wrapper = shallow(
      <DefaultColumnHeaderPresenter {...props} disableSort={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isFiltered is true', () => {
    const wrapper = shallow(
      <DefaultColumnHeaderPresenter {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when sort isFiltered is true', () => {
    const wrapper = shallow(
      <DefaultColumnHeaderPresenter {...props} isFiltered={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setFilter when <SortIcon /> onClick is fired', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<DefaultColumnHeaderPresenter {...clonedProps} />);
    wrapper.find(SortIcon).prop('onClick')();
    expect(clonedProps.setFilter).toHaveBeenCalled();
  });
});
