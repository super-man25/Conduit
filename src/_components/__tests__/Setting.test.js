import React from 'react';
import { Setting } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<Setting />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with edit prop', () => {
  const tree = renderer.create(<Setting edit />).toJSON();
  expect(tree).toMatchSnapshot();
});
