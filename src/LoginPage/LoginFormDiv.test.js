import React from 'react';
import LoginFormDiv from './LoginFormDiv';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<LoginFormDiv></LoginFormDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});