import React from 'react';
import renderer from 'react-test-renderer';
import { DayPicker } from '../DayPicker';

it('renders correctly when not showing', () => {
  const tree = renderer.create(<DayPicker />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when showing', () => {
  const tree = renderer.create(<DayPicker show />).toJSON();
  expect(tree).toMatchSnapshot();
});
