import React from 'react';
import { LogoName } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<LogoName></LogoName>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with login prop', () => {
  const tree = renderer
    .create(<LogoName login></LogoName>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});