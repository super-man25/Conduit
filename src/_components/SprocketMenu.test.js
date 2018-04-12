import React from 'react';
import { SprocketMenu } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<SprocketMenu></SprocketMenu>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
