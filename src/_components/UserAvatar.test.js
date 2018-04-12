import React from 'react';
import { UserAvatar } from './';
import renderer from 'react-test-renderer';
//do we need to import an image to perform this test?

it('renders correctly', () => {
  const tree = renderer
    .create(<UserAvatar></UserAvatar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
