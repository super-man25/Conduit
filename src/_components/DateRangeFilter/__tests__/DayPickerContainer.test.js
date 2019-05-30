import React from 'react';
import renderer from 'react-test-renderer';
import { DayPickerContainer } from '../DayPickerContainer';

it('renders correctly when not showing', () => {
  const tree = renderer.create(<DayPickerContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when showing', () => {
  const tree = renderer.create(<DayPickerContainer show />).toJSON();
  expect(tree).toMatchSnapshot();
});
