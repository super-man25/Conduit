import React from 'react';
import { SprocketMenu } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<SprocketMenu />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
