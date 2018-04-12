import React from 'react';
import LoginFormDiv from './';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<LoginFormDiv></LoginFormDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});