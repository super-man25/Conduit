import React from 'react';
import { LogoName } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<LogoName></LogoName>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});