import React from 'react';
import { LogoName } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<LogoName />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with login prop', () => {
  const tree = renderer.create(<LogoName login />).toJSON();
  expect(tree).toMatchSnapshot();
});
