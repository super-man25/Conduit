import React from 'react';
import LoginFooterDiv from './LoginFooterDiv';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<LoginFooterDiv></LoginFooterDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});