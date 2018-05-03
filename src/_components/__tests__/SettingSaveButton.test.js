import React from 'react';
import { SettingSaveButton } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<SettingSaveButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer.create(<SettingSaveButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});
