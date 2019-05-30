import React from 'react';
import renderer from 'react-test-renderer';
import { DropdownMenu } from '../DropdownMenu';

it('renders correctly', () => {
  const tree = renderer.create(<DropdownMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with the show prop', () => {
  const tree = renderer.create(<DropdownMenu show />).toJSON();
  expect(tree).toMatchSnapshot();
});
