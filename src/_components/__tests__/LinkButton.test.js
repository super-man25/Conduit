import React from 'react';
import { LinkButton } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<LinkButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer.create(<LinkButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});
