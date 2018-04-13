import React from 'react';
import { UserAvatar } from './';
import renderer from 'react-test-renderer';
// do we need to import an image to perform this test?

const testUser = { id: 1 };
it('renders correctly', () => {
  const tree = renderer
    .create(<UserAvatar user={testUser} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
