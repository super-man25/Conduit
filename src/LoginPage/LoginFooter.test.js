import React from 'react';
import LoginFooter from './';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<LoginFooter></LoginFooter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});