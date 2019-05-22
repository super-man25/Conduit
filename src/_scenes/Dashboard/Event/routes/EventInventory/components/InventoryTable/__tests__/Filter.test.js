import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Checkbox, FilterButton } from '../styled';

describe('<Filter />', () => {
  const props = {
    filters: [],
    selectedFilters: [],
    onItemClicked: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with scales', () => {
    const scales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' },
      { id: 4, name: 'Some Scale 4' },
      { id: 5, name: 'Some Scale 5' }
    ];
    const wrapper = shallow(<Filter {...props} filters={scales} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with selected scales', () => {
    const scales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' },
      { id: 4, name: 'Some Scale 4' },
      { id: 5, name: 'Some Scale 5' }
    ];

    const selectedScales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' }
    ];
    const wrapper = shallow(
      <Filter {...props} filters={scales} selectedFilters={selectedScales} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onItemClicked when a scale item is clicked', () => {
    const scales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' },
      { id: 4, name: 'Some Scale 4' },
      { id: 5, name: 'Some Scale 5' }
    ];

    const selectedScales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' }
    ];
    const onItemClicked = jest.fn();

    const wrapper = shallow(
      <Filter
        {...props}
        filters={scales}
        selectedFilters={selectedScales}
        onItemClicked={onItemClicked}
      />
    );

    wrapper
      .find(Checkbox)
      .at(0)
      .simulate('change');

    expect(onItemClicked).toHaveBeenCalledWith(scales[0]);
  });

  it('should call onClearAllClicked when the select all button is clicked', () => {
    const scales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' },
      { id: 4, name: 'Some Scale 4' },
      { id: 5, name: 'Some Scale 5' }
    ];
    const selectedScales = [
      { id: 1, name: 'Some Scale 1' },
      { id: 2, name: 'Some Scale 2' },
      { id: 3, name: 'Some Scale 3' }
    ];
    const onClearAllClicked = jest.fn();

    const wrapper = shallow(
      <Filter
        {...props}
        filters={scales}
        selectedFilters={selectedScales}
        onClearAllClicked={onClearAllClicked}
      />
    );

    wrapper
      .find(FilterButton)
      .at(0)
      .simulate('click');

    expect(onClearAllClicked).toHaveBeenCalled();
  });
});
