import React from 'react';
import { shallow } from 'enzyme';
import { ScaleFilter } from '../ScaleFilter';
import { Checkbox, ScaleFilterButton } from '../styled';

describe('<ScaleFilter />', () => {
  const props = {
    scales: [],
    selectedScales: [],
    onItemClicked: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ScaleFilter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with scales', () => {
    const scales = [
      'Some Scale 1',
      'Some Scale 2',
      'Some Scale 3',
      'Some Scale 4',
      'Some Scale 5'
    ];
    const wrapper = shallow(<ScaleFilter {...props} scales={scales} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with selected scales', () => {
    const scales = [
      'Some Scale 1',
      'Some Scale 2',
      'Some Scale 3',
      'Some Scale 4',
      'Some Scale 5'
    ];

    const selectedScales = ['Some Scale 1', 'Some Scale 2', 'Some Scale 3'];
    const wrapper = shallow(
      <ScaleFilter {...props} scales={scales} selectedScales={selectedScales} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onItemClicked when a scale item is clicked', () => {
    const scales = [
      'Some Scale 1',
      'Some Scale 2',
      'Some Scale 3',
      'Some Scale 4',
      'Some Scale 5'
    ];
    const selectedScales = ['Some Scale 1', 'Some Scale 2', 'Some Scale 3'];
    const onItemClicked = jest.fn();

    const wrapper = shallow(
      <ScaleFilter
        {...props}
        scales={scales}
        selectedScales={selectedScales}
        onItemClicked={onItemClicked}
      />
    );

    wrapper
      .find(Checkbox)
      .at(0)
      .simulate('change');

    expect(onItemClicked).toHaveBeenCalledWith(scales[0]);
  });

  it('should call onSelectAllClicked when the select all button is clicked', () => {
    const scales = [
      'Some Scale 1',
      'Some Scale 2',
      'Some Scale 3',
      'Some Scale 4',
      'Some Scale 5'
    ];
    const selectedScales = ['Some Scale 1', 'Some Scale 2', 'Some Scale 3'];
    const onSelectAllClicked = jest.fn();

    const wrapper = shallow(
      <ScaleFilter
        {...props}
        scales={scales}
        selectedScales={selectedScales}
        onSelectAllClicked={onSelectAllClicked}
      />
    );

    wrapper
      .find(ScaleFilterButton)
      .at(0)
      .simulate('click');

    expect(onSelectAllClicked).toHaveBeenCalled();
  });
});
