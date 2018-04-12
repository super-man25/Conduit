import React from 'react';
import { LeftNav } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<LeftNav></LeftNav>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});