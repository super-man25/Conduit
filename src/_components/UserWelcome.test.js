import React from 'react';
import { UserWelcome } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<UserWelcome></UserWelcome>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
