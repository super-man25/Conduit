import React from 'react';
import renderer from 'react-test-renderer';
import { Option } from '../Option';

const defaultProps = {
  isActive: false,
  dateRangePickerOpen: false,
};

it('renders correctly', () => {
  const tree = renderer.create(<Option {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when active', () => {
  const props = { ...defaultProps, isActive: true };
  const tree = renderer.create(<Option {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when dateRangePickerOpen is open', () => {
  const props = { ...defaultProps, dateRangePickerOpen: true };
  const tree = renderer.create(<Option {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
